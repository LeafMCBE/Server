import { mkdirSync, statSync } from "fs";
import fs from "fs/promises";

export class Plugins {
  validate() {
    if (!statSync("./leaf/plugins").isDirectory()) {
      this.createDir();
    }
  }

  async load() {
    this.validate();
    let _ = [];

    const folders = await fs.readdir("./leaf/plugins");
    for (let folder of folders) {
      const url = `file://${process.cwd().replace(/\\/g, "/")}`;
      const f = (await import(`${url}/leaf/plugins/${folder}/index.js`))
        .default;
      _.push(new f());
    }

    return _;
  }

  createDir() {
    mkdirSync("./leaf/plugins");
  }
}
