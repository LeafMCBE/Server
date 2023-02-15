import { Command } from "../base/BaseCommand.js";
import YML from "yaml";
import fs from "fs";

class Ban extends Command {
  constructor() {
    super({
      name: "ban",
      args: {
        min: 1,
        max: 2,
      },
      arguments: [
        {
          name: "player",
          type: "target",
          optional: false,
        },
        {
          name: "reason",
          type: "string",
          optional: true,
        },
      ],
    });
  }

  runAsPlayer(player, args) {
    const b = this.api.getServer().banned.get();

    if (b.includes(args[0]))
      return this.api.getLogger().info("This player already been banned.");

    if (
      this.api
        .getServer()
        .clients.filter(async (pl) => pl.client.username === args[0])[0]
    ) {
      this.api
        .getServer()
        .clients.filter(async (pl) => pl.client.username === args[0])[0]
        .kick(`You were been banned by ${player.username}`);

      const doc = new YML.Document();
      b.push({
        name: args[0],
        by: player.username,
      });
      doc.contents = b;

      fs.writeFileSync("./leaf/banned-player.yml", String(doc));
      this.api
        .getLogger()
        .info(
          `Banned ${
            this.api
              .getServer()
              .clients.filter(async (pl) => pl.client.username === args[0])[0]
              .client.username
          }`
        );
    } else this.api.getLogger().info("Player not online.");
  }

  run(args) {
    const b = this.api.getServer().banned.get();

    if (b.includes(args[0]))
      return this.api.getLogger().info("This player already been banned.");

    if (
      this.api
        .getServer()
        .clients.filter(async (pl) => pl.client.username === args[0])[0]
    ) {
      this.api
        .getServer()
        .clients.filter(async (pl) => pl.client.username === args[0])[0]
        .kick("You were been banned by CONSOLE");

      const doc = new YML.Document();
      b.push({
        name: args[0],
        by: "CONSOLE",
      });
      doc.contents = b;

      fs.writeFileSync("./leaf/banned-player.yml", String(doc));
      this.api
        .getLogger()
        .info(
          `Banned ${
            this.api
              .getServer()
              .clients.filter(async (pl) => pl.client.username === args[0])[0]
              .client.username
          }`
        );
    } else this.api.getLogger().info("Player not online.");
  }
}

export default Ban;
