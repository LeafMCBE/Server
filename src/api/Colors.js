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

const Colors = {
  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  red: (text, console) => {
    if (console) {
      return chalk.redBright(text);
    } else {
      return `§c${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  darkRed(text, console) {
    if (console) {
      return chalk.red(text);
    } else {
      return `§4${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  green(text, console) {
    if (console) {
      return chalk.greenBright(text);
    } else {
      return `§a${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  darkGreen(text, console) {
    if (console) {
      return chalk.green(text);
    } else {
      return `§2${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  blue(text, console) {
    if (console) {
      return chalk.blueBright(text);
    } else {
      return `§9${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  darkBlue(text, console) {
    if (console) {
      return chalk.blue(text);
    } else {
      return `§1${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  yellow(text, console) {
    if (console) {
      return chalk.yellowBright(text);
    } else {
      return `§e${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  darkYellow(text, console) {
    if (console) {
      return chalk.yellow(text);
    } else {
      return `§6${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  aqua(text, console) {
    if (console) {
      return chalk.cyanBright(text);
    } else {
      return `§b${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  darkAqua(text, console) {
    if (console) {
      return chalk.cyan(text);
    } else {
      return `§3${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  purple(text, console) {
    if (console) {
      return chalk.magentaBright(text);
    } else {
      return `§d${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  darkPurple(text, console) {
    if (console) {
      return chalk.magenta(text);
    } else {
      return `§5${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  gray(text, console) {
    if (console) {
      return chalk.gray(text);
    } else {
      return `§7${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  black(text, console) {
    if (console) {
      return chalk.black(text);
    } else {
      return `§0${text}`;
    }
  },

  /**
   *
   * @param {string} text
   * @param {boolean} console
   * @returns {string}
   */
  white(text, console) {
    if (console) {
      return text;
    } else {
      return `§f${text}`;
    }
  },

  /**
   * @param {string} text
   * @returns {string}
   */
  colorize(text) {
    const ar = text.split(" ");

    ar.forEach((text, index) => {
      colors.forEach((c) => {
        if (text.startsWith(c.mc)) ar[index] = c.method(text.substring(2));
      });
    });

    return `${ar.join(" ")}\x1b[0m`;
  },
};

const colors = [
  { mc: "§0", method: (t) => `\x1b[30m${t}` },
  { mc: "§1", method: (t) => `\x1b[34m${t}` },
  { mc: "§2", method: (t) => `\x1b[32m${t}` },
  { mc: "§3", method: (t) => `\x1b[36m${t}` },
  { mc: "§4", method: (t) => `\x1b[31m${t}` },
  { mc: "§5", method: (t) => `\x1b[35m${t}` },
  { mc: "§6", method: (t) => `\x1b[33m${t}` },
  { mc: "§7", method: (t) => `\x1b[37m${t}` },
  { mc: "§8", method: (t) => `\x1b[90m${t}` },
  { mc: "§9", method: (t) => `\x1b[94m${t}` },
  { mc: "§a", method: (t) => `\x1b[92m${t}` },
  { mc: "§b", method: (t) => `\x1b[96m${t}` },
  { mc: "§c", method: (t) => `\x1b[91m${t}` },
  { mc: "§d", method: (t) => `\x1b[95m${t}` },
  { mc: "§e", method: (t) => `\x1b[93m${t}` },
  { mc: "§f", method: (t) => `\x1b[97m${t}` },
];

export default Colors;
