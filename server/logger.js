/**
 * Logging service with multiple levels
 */
export class Logger {
  constructor(name = 'App') {
    this.name = name;
    this.level = process.env.LOG_LEVEL || 'info';
    this.levels = { error: 0, warn: 1, info: 2, debug: 3 };
  }

  shouldLog(level) {
    return this.levels[level] <= this.levels[this.level];
  }

  format(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${this.name}] [${level.toUpperCase()}] ${message} ${JSON.stringify(data)}`;
  }

  error(message, data) {
    if (this.shouldLog('error')) {
      console.error(this.format('error', message, data));
    }
  }

  warn(message, data) {
    if (this.shouldLog('warn')) {
      console.warn(this.format('warn', message, data));
    }
  }

  info(message, data) {
    if (this.shouldLog('info')) {
      console.log(this.format('info', message, data));
    }
  }

  debug(message, data) {
    if (this.shouldLog('debug')) {
      console.log(this.format('debug', message, data));
    }
  }
}
