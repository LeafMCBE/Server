import { EventEmitter } from "events";
import Player from "../api/Player.js";

declare class Events extends EventEmitter {
  on(name: "playerJoin", listener: (player: Player) => void): void;
  on(name: "playerLeft", listener: (player: Player) => void): void;
}

export default Events;
