import Server from "./src/Server.js";
const server = new Server();

export default server;

process.on("SIGINT", function () {
  console.log('Not a safe to exit, please type "shutdown" to exit.');
});
