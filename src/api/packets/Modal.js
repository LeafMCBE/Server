class Modal {
  constructor() {
    this.title = "no title provided";
    this.content = "no content provided";
    this.buttons = [];
  }

  /**
   *
   * @param {number} id
   */
  setId(id) {
    this.id = id;

    return this;
  }

  /**
   * @param {string} title
   */
  setTitle(title) {
    this.title = title;

    return this;
  }

  /**
   *
   * @param {string} content
   */
  setContent(content) {
    this.content = content;

    return this;
  }

  /**
   *
   * @param {string} string
   */
  setButton1(data) {
    this.buttons[0] = data;

    return this;
  }

  setButton2(data) {
    this.buttons[1] = data;

    return this;
  }

  execute(player) {
    player.client.queue("modal_form_request", {
      form_id: this.id,
      data: JSON.stringify({
        title: this.title,
        content: this.content,
        button1: this.buttons[0],
        button2: this.buttons[1],
        type: "modal",
      }),
    });

    player.client.on("modal_form_response", (packet) => {
      if (packet.form_id === this.id) {
        let accept;
        if (packet.data.startsWith("true")) accept = true;
        else accept = false;

        this.onResponse(player, accept);
      }
    });
    return this;
  }

  /**
   * @param {boolean} accepted
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  onResponse(player, accepted) {}
}

export default Modal;
