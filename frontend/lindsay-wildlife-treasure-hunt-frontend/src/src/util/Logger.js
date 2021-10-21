import Configuration from '../conf/Configuration'
import RemoteLogger from '../http/clients/RemoteLogger';

export class Logger {
  static LEVELS = {
    "DEBUG" : 0,
    "INFO"  : 1,
    "ERROR" : 2
  }

  static LEVEL

  static remoteLogger

  static Init() {
    Logger.LEVEL = Configuration.logLevel
    Logger.remoteLogger = new RemoteLogger(Configuration.remoteEndpoint);
  }

  static DateInfo(){
    return new Date().toISOString();
  }

  static RemoteLog(data) {
    Logger.remoteLogger.log(data)
  }

  static Log(level, data, remoteLog=false){
    if(Logger.LEVELS[level] >= Logger.LEVELS[Logger.LEVEL]){
      console.log(`[${Logger.DateInfo()} ${level}]: ${data}`)
      if(remoteLog == true){
        Logger.RemoteLog(`[${Logger.DateInfo()} ${level}]: ${data}`)
      }
    }
  }

  static info(data, remote=false) {
    Logger.Log('INFO', data, remote)
  }

  static debug(data,remote=false) {
    Logger.Log('DEBUG', data, remote)
  }

  static error(data,remote=false) {
    Logger.Log('ERROR', data, remote)
  }
}

export default Logger;