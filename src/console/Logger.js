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

import chalk from "chalk";

export default class Logger {
  constructor(options) {
    (async () => {
      this.options = options;
    })();
  }

  warn(text) {
    this.write("warn", text);
  }

  error(text) {
    this.write("error", text);
  }

  debug(text) {
    if (this.options.debug) this.write("debug", text);
  }

  info(text) {
    this.write("info", text);
  }

  async write(level, text) {
    const d = new Date();
    if (
      (await import("../../start.js")).default.config.LeafMCBE.showDateOnLogging
    )
      console.log(
        `[${d
          .toLocaleString()
          .replace(", ", " ")
          .toUpperCase()} ${this.getColorizeLevel(level)}] [${
          this.options.name
        }] ${text}`
      );
    else
      console.log(
        `[${this.getColorizeLevel(level)}] [${this.options.name}] ${text}`
      );
  }

  getColorizeLevel(level) {
    switch (level) {
      case "info":
        return chalk.blue("INFO");
      case "error":
        return chalk.red("ERROR");
      case "warn":
        return chalk.yellow("WARN");
      case "debug":
        return "DEBUG";
    }
  }
}
