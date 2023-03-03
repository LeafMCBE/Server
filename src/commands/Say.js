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

class Say extends Command {
  constructor() {
    super({
      name: "say",
      aliases: ["broadcast"],
      args: {
        min: 1,
        max: 1,
      },
      arguments: [
        {
          name: "message",
          type: "string",
          optional: false,
        },
      ],
    });
  }

  run(args) {
    if (!args)
      return this.api.getLogger().error("There is message to say/broadcast.");
    this.api.getServer().broadcast(args.join(" "));
  }

  /**
   *
   * @param {import('../api/Player').default} player
   * @param {string[]} args
   */
  runAsPlayer(_player, args) {
    this.api.getServer().broadcast(args.join(" "));
  }
}

export default Say;
