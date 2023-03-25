import Protocol from "bedrock-protocol";
import ResourcePackClientResponse from "./packets/handler/ResourcePackClientResponse.js";
import fs, { existsSync } from "fs";
import YML from "yaml";
import { Logger } from "./console/Logger.js";
import { Plugins } from "./plugins/Plugins.js";
import Colors from "./api/Colors.js";
import CCS from "./console/ConsoleCommandSender.js";
import Player from "./api/Player.js";
import Events from "./api/Events.js";
import Ban from "./api/Ban.js";
import Interact from "./packets/handler/Interact.js";
import ContainerClose from "./packets/ContainerClose.js";
import { mkdir } from "fs/promises";
import LangSelector from "./lang/Selector.js";

class Server {
  clients = [];
  banned = new Ban();
  console = new CCS();
  /**
   * @type {import('../types/api/Events.js').default}
   */
  events = new Events();
  plugins = new Plugins();
  /**
   * @type {import('../types/base/BaseLang.js').default}
   */
  lang;
  srv;

  async writeConfig() {
    if (!fs.existsSync("./leaf")) {
      mkdir("./leaf").then(async () => {
        if (!fs.existsSync("./leaf/config.yml")) {
          await this.writeConfig();
        }
      });
    }
    fs.writeFileSync(
      "./leaf/config.yml",
      `Server:
  host: 0.0.0.0
  port: 19132
  motd: "Dedicated LeafMCBE Server"
  version: 1.19.50
LeafMCBE:
  debug: true
  showDateOnLogging: true
  doNotCrashOnError: true
World:
  gamemode: "creative" # survival / creative / adventure
  dimension: "flat" # overworld / flat / nether / end / void
  biome: "plains" # https://minecraft-data.prismarine.js.org/?v=bedrock_1.19.50&d=biomes`
    );
  }

  async validate() {
    new Promise((res) => {
      if (!existsSync("./leaf")) {
        mkdir("./leaf");
      }

      if (!existsSync("./leaf/config.yml")) {
        this.writeConfig().then(() => {
          this.config = YML.parse(
            fs.readFileSync("./leaf/config.yml", "utf-8")
          );
        });
      } else {
        this.config = YML.parse(fs.readFileSync("./leaf/config.yml", "utf-8"));
      }

      if (!existsSync("./leaf/players")) {
        mkdir("./leaf/players");
      }

      if (!existsSync("./leaf/plugins")) {
        mkdir("./leaf/plugins");
      }

      res();

      this.lang = new LangSelector(this.config);
    });
  }

  async start() {
    this.validate().then(async () => {
      this.events.emit("onServerBeforeStart");
      try {
        this.logger = {
          srv: new Logger({
            name: "Server",
            debug: this.config.LeafMCBE.debug,
          }),
          plugin: new Logger({
            name: "Plugins",
            debug: this.config.LeafMCBE.debug,
          }),
          chat: new Logger({
            name: "Chat",
            debug: this.config.LeafMCBE.debug,
          }),
        };
        this.logger.srv.info(this.lang.startingServer);
        this.srv = await Protocol.createServer({
          host: this.config.Server.host,
          port: this.config.Server.port,
          motd: {
            motd: this.config.Server.motd,
          },
          version: String(this.config.Server.version),
        });

        this.events.emit("onServerStarted", this);
        this.logger.srv.info(
          this.lang.startedOn
            .replace("%i", this.config.Server.host)
            .replace("%p", this.config.Server.port)
        );

        for (let plugin of await this.plugins.load()) {
          this.logger.plugin.info(
            this.lang.loadingPlugin.replace(
              "%p",
              `${plugin.options.name}:${plugin.options.version.join(".")}`
            )
          );
          if (plugin.onEnable) plugin.onEnable();
        }

        this.logger.srv.debug(this.lang.loadingCCS);
        this.console.start();

        this.srv.on("connect", async (client) => {
          client.on("join", async () => {
            client.ip = client.connection.address;
            client.username = client.getUserData().displayName;
            client.items = [];

            const pl = new Player(client);
            const v = await this.banned.check(pl);
            if (!v) this.clients.push(pl);

            this.logger.srv.info(
              this.lang.playerConnected.replace(
                "%p",
                `${client.username}[${client.ip}]`
              )
            );

            client.write("resource_packs_info", {
              must_accept: false,
              has_scripts: false,
              behaviour_packs: [],
              texture_packs: [],
            });

            client.write("resource_pack_stack", {
              must_accept: false,
              behavior_packs: [],
              resource_packs: [],
              game_version: "",
              experiments: [],
              experiments_previously_used: false,
            });

            this.events.emit("onPlayerPreJoin", new Player(client));

            try {
              for (let plugin of await this.plugins.load()) {
                if (plugin.onPlayerPreJoin)
                  plugin.onPlayerPreJoin(new Player(client));
              }
            } catch (e) {
              this.logger.error(`Error from Plugin`);
              throw e;
            }

            client.on("packet", (packet) => {
              try {
                this.packet(packet, client);
              } catch (e) {
                this.logger.error(this.lang.errFromPacket);
                throw e;
              }
            });
          });

          client.on("close", async () => {
            const un = client.getUserData().displayName;
            const i = this.clients.findIndex(
              (v) => v.username === client.getUserData().displayName
            );
            delete this.clients[i];
            const n = this.events.emit("onPlayerLeave", new Player(client));
            if (!n) {
              const m = Colors.yellow(this.lang.playerLeft.replace("%p", un));
              this.broadcast(m);
            }
            let content = {
              username: un,
              items: client.items,
            };

            const document = new YML.Document(content);

            fs.writeFileSync(
              `./leaf/players/${content.username}.yml`,
              String(document),
              "utf-8"
            );

            try {
              for (let plugin of await this.plugins.load()) {
                if (plugin.onPlayerLeave)
                  plugin.onPlayerLeave(new Player(client));
              }
            } catch (e) {
              this.logger.srv.error(`Error from Plugin`);
              throw e;
            }
          });

          client.on("spawn", async () => {
            if (fs.existsSync(`./leaf/players/${client.username}.yml`)) {
              const file = fs.readFileSync(
                `./leaf/players/${client.username}.yml`,
                { encoding: "utf-8", flag: "r" }
              );
              const dec = YML.parse(file);
              for (let i = 0; i < dec.items.length; i++) {
                client.write("inventory_slot", {
                  window_id: "inventory",
                  slot: i,
                  item: {
                    network_id: dec.items[i].network_id,
                    count: dec.items[i].count,
                    metadata: 0,
                    has_stack_id: 1,
                    stack_id: 1,
                    block_runtime_id: dec.items[i].block_runtime_id,
                    extra: {
                      has_nbt: 0,
                      can_place_on: [],
                      can_destroy: [],
                    },
                  },
                });
              }
            }

            const n = this.events.emit("onPlayerJoin", new Player(client));
            if (!n) {
              const m = Colors.yellow(
                this.lang.playerJoined.replace(
                  "%p",
                  client.getUserData().displayName
                )
              );
              this.broadcast(m);
            }

            try {
              for (let plugin of await this.plugins.load()) {
                if (plugin.onPlayerJoin)
                  plugin.onPlayerJoin(new Player(client));
              }
            } catch (e) {
              this.logger.srv.error(this.lang.errFromPlugin);
              throw e;
            }
          });
        });
      } catch (e) {
        console.log("ERR");
        throw e;
      }
    });
  }

  constructor() {
    this.start();
  }

  broadcast(message) {
    this.clients.forEach((pl) => {
      pl.client.queue("text", {
        type: "chat",
        needs_transation: false,
        source_name: "",
        xuid: "",
        platform_chat_id: "",
        message: message,
      });
    });
    this.logger.chat.info(Colors.colorize(message));
  }

  async packet(packet, client) {
    switch (packet.data.name) {
      case "resource_pack_client_response":
        new ResourcePackClientResponse().handle(this, client, packet);
        break;
      case "text":
        client.queue("text", {
          type: "chat",
          needs_transation: false,
          source_name: "",
          xuid: "",
          platform_chat_id: "",
          message: `<${client.username}> ${packet.data.params.message}`,
        });

        this.logger.chat.info(
          Colors.colorize(`<${client.username}> ${packet.data.params.message}`)
        );
        break;
      case "command_request":
        var cmdName = packet.data.params.command;
        var _ = cmdName.split(" ");
        var arg = [];
        if (_.length > 1) {
          _.filter((_v, i) => i !== 0).forEach((v) => arg.push(v));
        }
        var args = arg.join(" ").match(/(?:[^\s"]+|"[^"]*")+/g);

        this.console.commands.forEach((cmd) => {
          if (
            cmdName.startsWith(`/${cmd.options.name.toLowerCase()}`) ||
            cmd.options.aliases?.includes(cmdName.replace("/", ""))
          ) {
            if (args && args.length < cmd.options.args.min)
              return new Player(client).send(
                `Minimum argument is ${cmd.options.args.min} but got ${
                  args.length
                }
Usage: /${
                  cmd.options.aliases
                    ? `[${cmd.options.name}|${cmd.options.aliases.join("|")}]`
                    : `${cmd.options.name}`
                } ${cmd.options.arguments.map(
                  (arg) => `
${arg.optional ? `[${arg.name}: ${arg.type}]` : `<${arg.name}: ${arg.type}>`}`
                )}                 
                `
              );

            if (args && args.length > cmd.options.args.mix)
              return new Player(client).send(
                `Maximum arguments is ${cmd.options.args.min} but got ${
                  args.length
                }
Usage: /${
                  cmd.options.aliases
                    ? `[${cmd.options.name}|${cmd.options.aliases.join("|")}]`
                    : `${cmd.options.name}`
                } ${cmd.options.arguments.map(
                  (arg) => `
${arg.optional ? `[${arg.name}: ${arg.type}]` : `<${arg.name}: ${arg.type}>`}`
                )}`
              );

            cmd.runAsPlayer(
              new Player(client),
              String(cmdName).split(" ").slice(1)
            );
          }
        });
        break;
      case "interact":
        Interact(packet, client);
        break;
      case "container_close":
        ContainerClose(client);
        break;
      case "item_stack_request":
        var count = 0;
        var network_id = 0;
        var block_runtime_id = 0;

        try {
          count = packet.data.params.requests[0].actions[2].count;
        } catch (e) {
          /* If there is no count this means that the player removed the item from his inventory */
        }
        try {
          network_id =
            packet.data.params.requests[0].actions[1].result_items[0]
              .network_id;
        } catch (e) {
          /* If there is no network id this means that the player removed the item from his inventory */
        }

        try {
          block_runtime_id =
            packet.data.params.requests[0].actions[1].result_items[0]
              .block_runtime_id;
        } catch (e) {
          /* If there is no block runtime id this means that the player removed the item from his inventory */
        }

        var jsonData = {
          count,
          network_id,
          block_runtime_id,
        };

        client.items.push(jsonData);
        for (let i = 0; i < client.items.length; i++) {
          client.write("inventory_slot", {
            window_id: "inventory",
            slot: i,
            item: {
              network_id: client.items[i].network_id,
              count: client.items[i].count,
              metadata: 0,
              has_stack_id: 1,
              stack_id: 1,
              block_runtime_id: client.items[i].block_runtime_id,
              extra: {
                has_nbt: 0,
                can_place_on: [],
                can_destroy: [],
              },
            },
          });
        }
        break;
    }
  }
}

export default Server;
