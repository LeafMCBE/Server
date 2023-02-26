import { Command } from "../base/BaseCommand.js";

class Kick extends Command {
  constructor() {
    super({
      name: "kick",
      description: "Kick an member.",
      aliases: [],
      args: {
        min: 1,
        max: 2,
      },
      arguments: [
        {
          name: "member",
          type: "operator",
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

  run(args) {
    const username = args[0];
    const reason = args[1] || "No Reason Provided";

    const index = this.api
      .getServer()
      .clients.findIndex((v) => v.username === username);
    if (!this.api.getServer().clients[index]) {
      this.api
        .getLogger()
        .info(this.api.getServer().lang.notOnline.replace("%p", username));
    }

    this.api.getServer().clients[index].kick(`${reason} by CONSOLE`);
    this.api.getLogger().info(`Kicked ${username} for ${reason}`);
  }

  runAsPlayer(player, args) {
    const username = args[0];
    const reason = args[1] || "No Reason Provided";

    const index = this.api
      .getServer()
      .clients.findIndex((v) => v.username === username);
    if (!this.api.getServer().clients[index]) {
      this.api.getLogger().info(`${username} not online.`);
    }

    this.api.getServer().clients[index].kick(`${reason} by ${player.username}`);
    this.api
      .getServer()
      .broadcast(`${player.username} kicked ${username} for ${reason}`);
  }
}

export default Kick;
