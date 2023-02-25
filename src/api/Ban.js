import fs from "fs";
import YML from "yaml";

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
      console.log(file);

      if (banned.find((v) => v.name === player.username)) {
        player.kick(
          `You were been banned by ${
            banned.find((v) => v.name === player.username).by
          }.`
        );
        return true;
      } else {
        return false;
      }
    });
  }
}

export default Ban;
