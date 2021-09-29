import Configuration from '../conf/Configuration'

export class Logger {
  static LEVELS = {
    "DEBUG" : 0,
    "INFO"  : 1,
    "ERROR" : 2
  }

  static LEVEL

  static Init() {
    Logger.LEVEL = Configuration.logLevel
  }

  static DateInfo(){
    return new Date().toISOString();
  }

  static RemoteLog(data) {

  }

  static Log(level, data){
    if(Logger.LEVELS[level] >= Logger.LEVELS[Logger.LEVEL]){
      console.log(`[${Logger.DateInfo()} ${level}]: ${data}`)
    }
  }

  static info(data) {
    Logger.Log('INFO', data)
  }

  static debug(data) {
    Logger.Log('DEBUG', data)
  }

  static error(data) {
    Logger.Log('ERROR', data)
  }
}

export default Logger;