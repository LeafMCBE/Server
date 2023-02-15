import API from "../console/API.js";

export class Command {
  constructor(options) {
    this.options = options;
    this.api = API();
  }
}
