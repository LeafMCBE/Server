import { Logger } from "../console/Logger.js";
import srv from "../../start.js";

export default (options) => {
  return {
    getLogger: () =>
      new Logger({ name: options.name, debug: srv.config.LeafMCBE.debug }),
    getServer: () => srv,
  };
};
