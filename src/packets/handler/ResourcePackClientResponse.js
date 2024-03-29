/**
 *  _                 __ __  __  _____ ____  ______
 * | |               / _|  \/  |/ ____|  _ \|  ____|
 * | |     ___  __ _| |_| \  / | |    | |_) | |__
 * | |    / _ \/ _` |  _| |\/| | |    |  _ <|  __|
 * | |___|  __/ (_| | | | |  | | |____| |_) | |____
 * |______\___|\__,_|_| |_|  |_|\_____|____/|______|
 *
 * Copyright 2023 hvlxh
 * Github: https://github.com/LeafMCBE/Server
 */

import { Client } from "bedrock-protocol";
import item from "bedrock-protocol/types/Item.js";
import fs from "fs";
import { LevelDB } from "leveldb-zlib";
import YML from "yaml";
import StartGame from "../StartGame.js";

export default class ResourcePackClientResponse {
  /**
   *
   * @param {import('../../Server.js').default} server
   * @param {Client} client
   * @param {*} packet
   */
  async handle(server, client, packet) {
    switch (packet.data.params.response_status) {
      case "refused":
        server.logger.srv.debug(
          server.lang.rpsRefused.replace("%p", client.username)
        );
        try {
          for (let plugin of await server.plugins.load()) {
            if (plugin.onPlayerRefusedRps)
              plugin.onPlayerRefusedRps(new Player(client));
          }
        } catch (e) {
          server.logger.srv.error(server.lang.errFromPlugin);
          throw e;
        }
        client.disconnect(`Refused to install RPS`);
        break;
      case "have_all_packs":
        server.logger.srv.debug(
          server.lang.rpsHaveAll.replace("%p", client.username)
        );
        try {
          for (let plugin of await server.plugins.load()) {
            if (plugin.onPlayerHavingAllRps)
              plugin.onPlayerHavingAllRps(new Player(client));
          }
        } catch (e) {
          server.logger.srv.error(server.lang.errFromPlugin);
          throw e;
        }
        break;
      case "completed":
        const Item = item(YML.parse(server.config.Server.version));

        for (let i = 0; i < 3; i++) {
          client.queue("inventory_slot", {
            window_id: 120,
            slot: 0,
            item: new Item().toBedrock(),
          });
        }

        StartGame.world_gamemode = server.config.World.gamemode;
        StartGame.player_gamemode = server.config.World.gamemode;
        StartGame.dimension = server.config.World.dimension;
        StartGame.biome = server.config.World.biome;
        StartGame.world_name = fs.readFileSync(
          "./leaf/worlds/flat/levelName.txt",
          "utf-8"
        );
        StartGame.level_id = fs.readFileSync(
          "./leaf/worlds/flat/levelName.txt",
          "utf-8"
        );

        client.queue("start_game", StartGame);
        client.queue("player_list", await this.get("player_list"));
        client.queue("item_component", { entries: [] });
        client.queue(
          "set_spawn_position",
          await this.get("set_spawn_position")
        );
        client.queue("set_time", { time: 5433771 });
        client.queue("set_difficulty", { difficulty: 1 });
        client.queue("set_commands_enabled", { enabled: true });

        client.queue(
          "biome_definition_list",
          await this.get("biome_definition_list")
        );
        client.queue(
          "available_entity_identifiers",
          await this.get("available_entity_identifiers")
        );
        client.queue("update_attributes", await this.get("update_attributes"));
        client.queue("creative_content", await this.get("creative_content"));
        client.queue("inventory_content", await this.get("inventory_content"));
        client.queue("player_hotbar", {
          selected_slot: 1,
          window_id: "inventory",
          select_slot: true,
        });
        client.queue("crafting_data", await this.get("crafting_data"));
        client.queue(
          "game_rules_changed",
          await this.get("game_rules_changed")
        );
        client.queue("respawn", await this.get("respawn"));
        client.queue("chunk_radius_update", { chunk_radius: 32 });
        client.queue("network_chunk_publisher_update", {
          coordinates: { x: 13, y: 155, z: -28 },
          radius: 272,
          saved_chunks: [],
        });

        const db = new LevelDB(`./leaf/worlds/flat/db`);
        await db.open();

        for await (const [_key, val] of db.getIterator({
          keyAsBuffer: false,
          valueAsBuffer: false,
        })) {
          const d = JSON.parse(val);
          client.queue("level_chunk", d);
        }

        await db.close();

        setInterval(() => {
          client.queue("network_chunk_publisher_update", {
            coordinates: { x: 13, y: 155, z: -28 },
            radius: 272,
            saved_chunks: [],
          });
        }, 4500);

        try {
          for (let plugin of await server.plugins.load()) {
            if (plugin.onPlayerInstalledRps)
              plugin.onPlayerInstalledRps(new Player(client));
          }
        } catch (e) {
          server.logger.srv.error(server.lang.errFromPlugin);
          throw e;
        }

        let commands = {
          values_len: 0,
          _enum_type: "byte",
          enum_values: [],
          suffixes: [],
          enums: [],
          command_data: [],
          dynamic_enums: [],
          enum_constraints: [],
        };

        server.console.commands.forEach((cmd) => {
          commands.command_data.push({
            name: cmd.options.name,
            description: cmd.options.description || "No Description provided",
            flags: 0,
            permission_level: 0,
            alias: -1,
            overloads: [
              cmd.options.arguments.map((v) => {
                return {
                  parameter_name: v.name,
                  value_type: v.type,
                  enum_type: "valid",
                  optional: v.optional | false,
                  options: {
                    unused: 0,
                    collapse_enum: 0,
                    has_semantic_constraint: 0,
                    as_chained_command: 0,
                    unknown2: 0,
                  },
                };
              }),
            ],
          });
          client.write("available_commands", commands);
        });

        setTimeout(async () => {
          client.write("play_status", { status: "player_spawn" });
        }, 3000);

        client.on("tick_sync", (packet) => {
          client.queue("tick_sync", {
            request_time: packet.request_time,
            response_time: BigInt(Date.now()),
          });
        });
        break;
    }
  }

  /**
   *
   * @param {string} name
   */
  async get(name) {
    return (await import(`../${name}.json`, { assert: { type: "json" } }))
      .default;
  }
}
