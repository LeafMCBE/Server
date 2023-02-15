/**
 *
 * @param {import('bedrock-protocol').Client} client
 */
function ContainerClose(client) {
  client.write("container_close", {
    window_id: -1,
    server: false,
  });
}

export default ContainerClose;
