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
