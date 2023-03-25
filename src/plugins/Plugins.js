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

import { mkdirSync, statSync } from "fs";
import fs from "fs/promises";

export class Plugins {
  /**
   * Validate if something is wrong.
   *
   * @private
   * @returns {void}
   */
  validate() {
    if (!statSync("./leaf/plugins").isDirectory()) {
      this.createDir();
    }
  }

  /**
   * Load the plugins
   *
   * @public
   * @returns {import('../base/BaseCommand.js').default[]}
   */
  async load() {
    this.validate();
    let _ = [];

    const folders = await fs.readdir("./leaf/plugins");
    for (let folder of folders) {
      const url = `file://${process.cwd().replace(/\\/g, "/")}`;

      try {
        await fs.access(`./leaf/plugins/${folder}/index.js`);
        const f = (await import(`${url}/leaf/plugins/${folder}/index.js`))
          .default;
        _.push(new f());
      } catch {
        /* empty */
      }
    }

    return _;
  }

  /**
   * Create a dir for plugins.
   *
   * @private
   * @returns {void}
   */
  createDir() {
    mkdirSync("./leaf/plugins");
  }
}
