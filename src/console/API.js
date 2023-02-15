import { Logger } from "./Logger.js";
import srv from "../../start.js";

export default () => {
  return {
    getLogger: () =>
      new Logger({ name: `Command`, debug: srv.config.LeafMCBE.debug }),
    getServer: () => srv,
  };
};
