import Shutdown from "./src/api/Shutdown.js";
// eslint-disable-next-line no-unused-vars
import server from "./start.js";

setTimeout(() => {
  Shutdown(server);
}, 10000);
