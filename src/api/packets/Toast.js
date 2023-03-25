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
  constructor() {
    this.title = null;
    this.message = null;
  }

  setTitle(text) {
    this.title = text;
  }

  setMessage(text) {
    this.message = text;
  }

  execute(player) {
    player.client.write("toast_request", {
      title: this.title,
      message: this.message,
    });
  }
}

export default Toast;
