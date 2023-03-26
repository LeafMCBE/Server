import { readdir } from "fs/promises";
import { LevelDB } from "leveldb-zlib";

const chunks = [];

async function Worlds(server) {
  server.logger.srv.info("Loading Worlds");
  const folders = await readdir("./leaf/worlds");

  for (let folder of folders) {
    server.logger.srv.info(`Loading World - ${folder}`);

    const db = new LevelDB(`./leaf/worlds/${folder}/db`);
    await db.open();

    chunks.push({
      name: folder,
      data: [],
    });

    for await (const [_key, val] of db.getIterator({
      keyAsBuffer: false,
      valueAsBuffer: false,
    })) {
      const d = JSON.parse(val);
      const i = chunks.findIndex((v) => v.name === folder);
      chunks[i].data.push(d);
    }

    await db.close();
    return chunks;
  }
}

export default Worlds;
