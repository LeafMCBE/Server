import { Command } from "../base/BaseCommand.js";
import shut from "../api/Shutdown.js";

class Shutdown extends Command {
  constructor() {
    super({
      name: "shutdown",
      aliases: ["close", "exit"],
      args: {
        min: 0,
        max: 0,
      },
      arguments: [],
    });
  }

  run() {
    this.api.getServer().broadcast("Shut downing the server in few seconds...");
    setTimeout(() => {
      shut(this.api.getServer());
    }, 2000);
  }

  runAsPlayer() {
    this.api.getServer().broadcast("Shut downing the server in few seconds...");
    setTimeout(() => {
      shut(this.api.getServer());
    }, 2000);
  }
}

export default Shutdown;
