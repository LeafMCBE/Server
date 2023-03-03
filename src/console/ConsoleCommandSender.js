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

import readline from "readline";
import fs from "fs";
import { Logger } from "./Logger.js";
import srv from "../../start.js";

export default class CCS {
  constructor() {
    /**
     * @type {import('../base/BaseCommand.js').Command[]}
     */
    this.commands = [];
  }

  async load() {
    const cmds = fs.readdirSync("./src/commands");
    for (let file of cmds) {
      const cmd = new (await import(`../commands/${file}`)).default();
      this.commands.push(cmd);
    }
  }

  async start() {
    this.load().then(() => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.setPrompt("");

      rl.on("SIGINT", () => {
        process.emit("SIGINT");
      });

      rl.on("line", (data) => {
        const _ = data.split(" ");
        /**
         * @type {string[]}
         */
        let arg = [];
        if (_.length > 1) {
          _.filter((_v, i) => i !== 0).forEach((v) => arg.push(v));
        }
        let args = arg.join(" ").match(/(?:[^\s"]+|"[^"]*")+/g) || [];

        for (let cmd of this.commands) {
          if (
            cmd.options.name === _[0] ||
            cmd.options.aliases?.includes(_[0].toLowerCase())
          ) {
            if (args.length < cmd.options.args.min)
              return new Logger({
                name: "Console",
                debug: srv.config.LeafMCBE.debug,
              }).info(
                srv.lang.minArg
                  .replace("%m", cmd.options.args.min)
                  .replace("%r", args.length)
                  .replace(
                    "%u",
                    `/${
                      cmd.options.aliases
                        ? `[${cmd.options.name}|${cmd.options.aliases.join(
                            "|"
                          )}]`
                        : `${cmd.options.name}`
                    } ${cmd.options.arguments
                      .map(
                        (arg) => `
${arg.optional ? `[${arg.name}: ${arg.type}]` : `<${arg.name}: ${arg.type}>`}`
                      )
                      .join(" ")}`
                  )
              );

            if (args.length > cmd.options.args.max)
              return new Logger({
                name: "Console",
                debug: srv.config.LeafMCBE.debug,
              }).info(
                srv.lang.maxArg
                  .replace("%m", cmd.options.args.min)
                  .replace("%r", args.length)
                  .replace(
                    "%u",
                    `/${
                      cmd.options.aliases
                        ? `[${cmd.options.name}|${cmd.options.aliases.join(
                            "|"
                          )}]`
                        : `${cmd.options.name}`
                    } ${cmd.options.arguments
                      .map(
                        (arg) => `
${arg.optional ? `[${arg.name}: ${arg.type}]` : `<${arg.name}: ${arg.type}>`}`
                      )
                      .join(" ")}`
                  )
              );

            cmd.run(args);
          }
        }
      });
    });
  }
}
