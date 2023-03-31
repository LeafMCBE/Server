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
  constructor() {
    this.text = null;
    this.fadeIn = null;
    this.fadeOut = null;
    this.stayTime = null;
  }

  setText(text) {
    this.text = text;

    return this;
  }

  setStayTime(number) {
    this.stayTime = number;

    return this;
  }

  setFadeIn(number) {
    this.fadeIn = number;

    return this;
  }

  setFadeOut(number) {
    this.fadeOut = number;

    return this;
  }

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
