import { Server } from "bedrock-protocol";
import { EventEmitter } from "events";
import Player from "../api/Player.js";

declare class Events extends EventEmitter {
  on(name: "onPlayerPreJoin", listener: (player: Player) => void): this;
  on(name: "onPlayerJoin", listener: (player: Player) => void): this;
  on(name: "onPlayerLeave", listener: (player: Player) => void): this;
  on(name: "onServerStarted", listener: (server: Server) => void): this;
  on(name: "onServerBeforeStart", listener: () => void): this;
  on(name: "onServerClose", listener: (server: Server) => void): this;

  emit(name: "onPlayerPreJoin", listener: (player: Player) => void): boolean;
  emit(name: "onPlayerJoin", listener: (player: Player) => void): boolean;
  emit(name: "onPlayerLeave", listener: (player: Player) => void): boolean;
  emit(name: "onServerStarted", listener: (server: Server) => void): boolean;
  emit(name: "onServerBeforeStart", listener: () => void): boolean;
  emit(name: "onServerClose", listener: (server: Server) => void): boolean;
}

export default Events;
