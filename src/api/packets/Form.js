class Form {
  constructor() {
    this.title = "No title provided";
    this.contents = [];
    this.buttons = [];
  }

  setTitle(title) {
    this.title = title;

    return this;
  }

  addInput(text, placeholder) {
    this.contents.push({ type: "input", text, placeholder });

    return this;
  }

  addLabel(text) {
    this.contents.push({ type: "label", text });

    return this;
  }

  addToggle(text) {
    this.contents.push({ type: "toggle", text });

    return this;
  }

  addDropdown(text, ...options) {
    this.contents.push({
      type: "dropdown",
      text,
      options,
    });

    return this;
  }

  addSlider(text, min, max, step = -1) {
    this.contents.push({
      type: "slider",
      min,
      max,
      text,
      step,
    });

    return this;
  }

  addButton(text) {
    this.buttons.push({ text });

    return this;
  }

  setButtons(btns) {
    this.buttons = btns;

    return this;
  }

  setId(id) {
    this.id = id;

    return this;
  }

  execute(player) {
    player.client.queue("modal_form_request", {
      form_id: this.id,
      data: JSON.stringify({
        title: this.title,
        content: this.contents,
        buttons: this.buttons,
        type: "custom_form",
      }),
    });

    player.client.on("modal_form_response", (data) => {
      if (data.has_response_data && data.form_id === this.id) {
        const nonStrData = new Array(data.data.replace("\n", ""));
        this.onResponse(player, nonStrData);
      }
    });

    return this;
  }

  /**
   *
   * @abstract
   * @param {import('../Player.js').default} player
   * @param {any[]} data
   */
  // eslint-disable-next-line no-unused-vars
  onResponse(player, data) {}
}

export default Form;
