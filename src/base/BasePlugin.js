import API from "../plugins/API.js";

export class Base {
  options;
  api;

  constructor(options) {
    this.options = options;
    this.api = API(options);
  }
}
