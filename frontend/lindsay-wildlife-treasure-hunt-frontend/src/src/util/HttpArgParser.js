import Logger from './Logger';

export class HttpArgParser {
  static DEBUG_MODE = "false"
  static GAME_COMPLETED_PREVIOUSLY = "false"

  static Init(){
    try {
      var selfReferenceURL = new URL(window.location.href);
      HttpArgParser.ParseDebugMode(selfReferenceURL)
      HttpArgParser.ParseGameCompletedPreviously(selfReferenceURL)
      HttpArgParser.Print()
    } catch(error) {
      Logger.error(`HttpArgParser failure: ${error}`, true)
    }
  }

  static ParseGameCompletedPreviously(url) {
    var gameCompleted = url.searchParams.get("game_completed_previously");
    if(gameCompleted != undefined){
      HttpArgParser.GAME_COMPLETED_PREVIOUSLY = gameCompleted
    }
  }

  static ParseDebugMode(url){
    var debugMode = url.searchParams.get("debug");
    if(debugMode != undefined){
      HttpArgParser.DEBUG_MODE = debugMode
    }
  }

  static Print(){
    Logger.info(`HttpArgParser info:\n
      DebugMode: ${HttpArgParser.DEBUG_MODE}
    `)
  }
}


export default HttpArgParser;