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
  }

  setStayTime(number) {
    this.stayTime = number;
  }

  setFadeIn(number) {
    this.fadeIn = number;
  }

  setFadeOut(number) {
    this.fadeOut = number;
  }

  execute(player) {
    player.client.write("set_title", {
      type: 2,
      text: this.text,
      fade_in_time: this.fadeIn,
      stay_time: this.stayTime,
      fade_out_time: this.fadeOut,
      xuid: "",
      platform_online_id: "",
    });
  }
}

export default Title;
