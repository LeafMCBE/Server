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
