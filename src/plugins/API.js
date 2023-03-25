/**
 *  _                 __ __  __  _____ ____  ______
 * | |               / _|  \/  |/ ____|  _ \|  ____|
 * | |     ___  __ _| |_| \  / | |    | |_) | |__
 * | |    / _ \/ _` |  _| |\/| | |    |  _ <|  __|
 * | |___|  __/ (_| | | | |  | | |____| |_) | |____
 * |______\___|\__,_|_| |_|  |_|\_____|____/|______|
 *
 * Copyright 2023 hvlxh
 * Github: https://github.com/LeafMCBE/Server
 */

import { Logger } from "../console/Logger.js";
import srv from "../../start.js";

/**
 * @type {import("../../src/base/BasePlugin.js").BaseOptions}
 */
export default (options) => {
  return {
    /**
     *
     * @returns {import('../console/Logger.js').default}
     */
    getLogger: () =>
      new Logger({ name: options.name, debug: srv.config.LeafMCBE.debug }),

    /**
     *
     * @returns {import('../Server.js').default}
     */
    getServer: () => srv,
  };
};
