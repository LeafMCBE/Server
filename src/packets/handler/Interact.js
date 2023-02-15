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
        `Unhandled player interaction: ${packet.data.params.action_id}`
      );
  }
}

export default Interact;
