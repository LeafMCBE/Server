import { Logger } from "../console/Logger.js";
import Server from "../Server.js";

declare function API(): {
  getLogger: () => Logger;
  getServer: () => Server;
};

export default API;
