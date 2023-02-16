import Player from "../Player.js";

declare class Toast {
  setTitle(text: string): void;
  setMessage(text: string): void;
  execute(player: Player): void;
}

export default Toast;
