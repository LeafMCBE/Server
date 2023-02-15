import server from "../../start.js";
import API from "./API.js";

class Command {
  constructor(options) {
    this.options = options;
    this.api = API({
      name: options.name,
    });
  }

  execute() {
    server.console.commands.push(this);
  }
}

export default Command;
