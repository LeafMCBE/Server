type LoggerLevels = "info" | "warn" | "error" | "debug";

interface LoggerOptions {
  name: string;
  debug?: boolean;
}

declare class Logger {
  private readonly options: LoggerOptions;
  constructor(options: LoggerOptions);
  private write(level: LoggerLevels, text: string): void;
  public info(text: string): void;
  public warn(text: string): void;
  public error(text: string): void;
  public debug(text: string): void;
}

export { Logger, LoggerOptions, LoggerLevels };
