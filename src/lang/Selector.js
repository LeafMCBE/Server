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

import English from "./English.js";

class LangSelector {
  /**
   * @private
   */

  english = English;

  /**
   * @type {import('../../types/base/BaseLang.js').default}
   * @public
   * @readonly
   */
  lang;

  /**
   *
   * @param {*} server
   * @returns {import('../../types/base/BaseLang.js')}
   */
  constructor(config) {
    if (config.LeafMCBE.lang === "eng") {
      this.lang = this.english;

      return this.lang;
    }
  }
}

export default LangSelector;
