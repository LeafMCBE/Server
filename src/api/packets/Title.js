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

class Title {
  /**
   * @private
   */
  text;

  /**
   * @private
   */
  fadeIn;

  /**
   * @private
   */
  fadeOut;

  /**
   * @private
   */
  stayTime;

  /**
   *
   * @param {string} Text
   * @returns {Title}
   */
  setText(text) {
    this.text = text;

    return this;
  }

  /**
   *
   * @param {number} number
   * @returns {Title}
   */
  setStayTime(number) {
    this.stayTime = number;

    return this;
  }

  /**
   *
   * @param {number} number
   * @returns {Title}
   */
  setFadeIn(number) {
    this.fadeIn = number;

    return this;
  }

  /**
   *
   * @param {number} number
   * @returns {Title}
   */
  setFadeOut(number) {
    this.fadeOut = number;

    return this;
  }

  /**
   *
   * @param {import('../Player.js').default} player
   * @returns {Title}
   */
  execute(player) {
    player.client.queue("set_title", {
      type: 2,
      text: this.text,
      fade_in_time: this.fadeIn,
      stay_time: this.stayTime,
      fade_out_time: this.fadeOut,
      xuid: "",
      platform_online_id: "",
    });

    return this;
  }
}

export default Title;
