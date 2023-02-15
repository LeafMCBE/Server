import Player from "../api/Player.js";
import { Logger } from "../console/Logger.js";
import Server from "../Server.js";

interface ArgOptions {
  name: string;
  type:
    | "int"
    | "float"
    | "value"
    | "wildcard_int"
    | "wildcard_target"
    | "operator"
    | "command_operator"
    | "target"
    | "file_path"
    | "integer_range"
    | "equipment_slots"
    | "string"
    | "block_position"
    | "position"
    | "message"
    | "raw_text"
    | "json"
    | "block_states"
    | "command";
  optional?: boolean;
}

interface Options {
  name: string;
  description: string;
  aliases: string[];
  args: {
    min: number;
    max: number;
  };
  arguments: ArgOptions[];
}

declare class Command {
  public readonly options: Options;
  public readonly api: {
    getLogger: () => Logger;
    getServer: () => Server;
  };

  constructor(options: Options);

  run(args: string[]): void;
  runAsPlayer(player: Player, args: string[]): void;
}

export default Command;
