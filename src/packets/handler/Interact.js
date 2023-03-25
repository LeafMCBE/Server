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

import server from "../../../start.js";
import ContainerOpen from "../ContainerOpen.js";

/**
 *
 * @param {object} packet
 * @param {import('bedrock-protocol').Client} client
 */
function Interact(packet, client) {
  switch (packet.data.params.action_id) {
    case "open_inventory":
      ContainerOpen(client);
      break;
    default:
      server.logger.srv.warn(
        server.lang.unhandledInteract.replace(
          "%i",
          packet.data.params.action_id
        )
      );
  }
}

export default Interact;
