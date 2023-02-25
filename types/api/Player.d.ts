import { Client } from "bedrock-protocol";

declare class Player {
  public readonly client: Client;
  public readonly username: string;
  constructor(client: Client);

  public kick(reason: string): void;
  public send(text: string): void;
}

export default Player;
