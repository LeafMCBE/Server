import chalk from "chalk";
import fs from "fs";
import YML from "yaml";

const Config = fs.readFileSync("./leaf/config.yml", "utf-8");
const config = YML.parse(Config);
export class Logger {
  constructor(options) {
    this.options = options;
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

  write(level, text) {
    const d = new Date();
    if (config.LeafMCBE.showDateOnLogging)
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
