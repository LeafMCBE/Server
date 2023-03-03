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

import fs from "fs";
import YML from "yaml";
import server from "../../start.js";

class Ban {
  validate() {
    return new Promise((res) => {
      if (!fs.existsSync("./leaf/banned-players.yml"))
        fs.writeFileSync("./leaf/banned-players.yml", "[]", "utf-8");

      res();
    });
  }

  get() {
    this.validate();

    const file = fs.readFileSync("./leaf/banned-players.yml", "utf-8");
    /**
     * @type {string[]}
     */
    const banned = YML.parse(file);
    return banned;
  }

  /**
   *
   * @param {import('./Player').default} player
   * @returns {Promise<boolean>}
   */
  check(player) {
    this.validate().then(() => {
      const file = fs.readFileSync("./leaf/banned-players.yml", "utf-8");
      /**
       * @type {import('./Ban.js').BanList[]}
       */
      const banned = YML.parse(file);
      if (banned.find((v) => v.name === player.username)) {
        player.kick(
          server.lang.banned.replace(
            "%u",
            banned.find((v) => v.name === player.username).by
          )
        );
        return true;
      } else {
        return false;
      }
    });
  }
}

export default Ban;
