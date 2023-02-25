import { Logger } from "../../src/console/Logger.js";
import Server from "../../src/Server.js";
import { BaseOptions } from "../../src/base/BasePlugin.js";

interface Return {
  getLogger: () => Logger;
  getServer: () => Server;
}

declare function API(options: BaseOptions): Return;

export default API;
