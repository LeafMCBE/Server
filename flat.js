import { LevelDB } from "leveldb-zlib";
import chunks from "./leaf/worlds/flat.json" assert { type: "json" };

const db = new LevelDB(
  `${process.cwd().replace(/\\/g, "/")}/leaf/worlds/flat/db`,
  { createIfMissing: true }
);

await db.open();
chunks.forEach((chunk, i) => {
  if (i) db.put(String(i), JSON.stringify(chunk));
});
await db.close();
