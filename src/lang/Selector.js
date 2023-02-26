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
