import Player from "../Player.js";

type TitleType =
  | "clear"
  | "reset"
  | "set_title"
  | "set_subtitle"
  | "action_bar_message"
  | "set_durations"
  | "set_title_json"
  | "set_subtitle_json"
  | "action_bar_message_json";

declare class Title {
  public readonly text: string;
  public readonly type: TitleType;
  public readonly stayTime: number;
  public readonly fadeIn: number;
  public readonly fadeOut: number;

  setText(text: string): void;
  setType(text: TitleType): void;
  setStayTime(number: number): void;
  setFadeIn(number: number): void;
  setFadeOut(number: number): void;
  execute(player: Player): void;
}

export default Title;
