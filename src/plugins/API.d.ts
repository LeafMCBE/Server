import { Logger } from "../console/Logger.js";
import Server from "../Server.js";
import { BaseOptions } from "../base/BasePlugin.js";

interface Return {
  getLogger: () => Logger;
  getServer: () => Server;
}

declare function API(options: BaseOptions): Return;

export default API;
