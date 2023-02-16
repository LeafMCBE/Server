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
