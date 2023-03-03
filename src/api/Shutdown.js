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

import YML from "yaml";
import fs from "fs";

/**
 *
 * @param {import('../Server.js').default} server
 */
function Shutdown(server) {
  server.clients.forEach(async (pl) => {
    pl.client.disconnect("Server closed");

    let content = {
      username: pl.username,
      items: pl.client.items,
    };

    const document = new YML.Document(content);

    fs.writeFileSync(
      `./leaf/players/${content.username}.yml`,
      String(document),
      "utf-8"
    );
  });

  server.srv.close("Server Closed");
  server.logger.srv.info("Safe exit.");
  process.exit(0);
}

export default Shutdown;
