import fs from "fs";
import YML from "yaml";

class Ban {
  validate() {
    if (!fs.statSync("./leaf/banned-player.yml").isFile())
      fs.writeFileSync("./leaf/banned-player.yml", "---\n[]");
  }

  get() {
    this.validate();

    const file = fs.readFileSync("./leaf/banned-player.yml", "utf-8");
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
    this.validate();

    const file = fs.readFileSync("./leaf/banned-player.yml", "utf-8");
    /**
     * @type {import('./Ban.js').BanList[]}
     */
    const banned = YML.parse(file);

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
  }
}

export default Ban;
