import { Server, Version } from "bedrock-protocol";
import { Logger } from "../src/console/Logger.js";
import { Plugins } from "../src/plugins/Plugins.js";
import CCS from "../src/console/ConsoleCommandSender.js";
import Player from "../src/api/Player.js";
import Ban from "../src/api/Ban.js";
import Events from "../src/api/Events.js";

interface Configure {
  Server: {
    host: string;
    port: number;
    motd: string;
    version: Version;
  };
  LeafMCBE: {
    debug: boolean;
    showDateOnLogging: boolean;
    doNotCrashOnError: boolean;
  };
}

export default class {
  public readonly config: Configure;
  public readonly banned: Ban;
  public readonly events: Events;
  public readonly logger: {
    srv: Logger;
    plugin: Logger;
    chat: Logger;
  };
  public readonly srv: Server;
  public readonly plugins: Plugins;
  public readonly console: CCS;
  public readonly clients: Player[];
  constructor();

  public broadcast(message: string): void;
}
