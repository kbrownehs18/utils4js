export class Logger {
  logLevel: string;

  constructor(logLevel: string = 'info') {
    this.logLevel = logLevel;
  }

  log(level: string, ...messages: any[]) {
    if (this.shouldLog(level)) {
      console.log(...messages);
    }
  }

  error(...messages: any[]) {
    this.log('error', ...messages);
  }

  warn(...messages: any[]) {
    this.log('warn', ...messages);
  }

  info(...messages: any[]) {
    this.log('info', ...messages);
  }

  private shouldLog(level: string) {
    const logLevels = ['error', 'warn', 'info'];
    const currentLevelIndex = logLevels.indexOf(this.logLevel);
    const messageLevelIndex = logLevels.indexOf(level);
    return messageLevelIndex <= currentLevelIndex;
  }
}
