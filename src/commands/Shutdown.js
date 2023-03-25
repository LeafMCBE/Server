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
