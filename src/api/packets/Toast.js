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

class Toast {
  /**
   * @private
   * @type {string}
   */
  title;

  /**
   * @private
   * @type {string}
   */
  message;

  /**
   *
   * @param {string} text
   * @returns {Toast}
   */
  setTitle(text) {
    this.title = text;

    return this;
  }

  /**
   *
   * @param {string} text
   * @returns {Toast}
   */
  setMessage(text) {
    this.message = text;

    return this;
  }

  /**
   *
   * @param {import('../Player.js').default} player
   * @returns {Toast}
   */
  execute(player) {
    player.client.queue("toast_request", {
      title: this.title,
      message: this.message,
    });
  }
}

export default Toast;
