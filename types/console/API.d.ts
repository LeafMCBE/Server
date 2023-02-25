import { Logger } from "../../src/console/Logger.js";
import Server from "../../src/Server.js";

declare function API(): {
  getLogger: () => Logger;
  getServer: () => Server;
};

export default API;
