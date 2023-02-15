/**
 *
 * @param {import('bedrock-protocol').Client} client
 */
function ContainerOpen(client) {
  client.write("container_open", {
    window_id: -1,
    window_type: "inventory",
    coordinates: { x: 0, y: 0, z: 0 },
    runtime_entity_id: 2,
  });
}

export default ContainerOpen;
