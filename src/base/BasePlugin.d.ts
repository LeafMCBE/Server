import Player from "../api/Player.js";
import { Logger } from "../console/Logger.js";
import Server from "../Server.js";

export interface BaseOptions {
  name: string;
  version: [number, number, number];
  srvVersion: [number, number, number];
}

export declare class Base {
  public readonly api: {
    getLogger: () => Logger;
    getServer: () => Server;
  };
  public readonly options: BaseOptions;

  constructor(options: BaseOptions);

  onEnable(): void;
  onDisable(): void;
  onPlayerJoin(player: Player): void;
  onPlayerPreJoin(player: Player): void;
  onPlayerLeave(player: Player): void;
  onPlayerHavingAllRps(player: Player): void;
  onPlayerRefusedRps(player: Player): void;
  onPlayerInstalledRps(player: Player): void;
}
