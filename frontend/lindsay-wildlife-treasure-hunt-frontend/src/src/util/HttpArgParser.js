import Logger from './Logger';

export class HttpArgParser {
  static DEBUG_MODE = "false"
  static GAME_COMPLETED_PREVIOUSLY = "false"
  static ADMIN_PAGE = "false"

  static Init(){
    try {
      var selfReferenceURL = new URL(window.location.href);
      HttpArgParser.ParseDebugMode(selfReferenceURL)
      HttpArgParser.ParseGameCompletedPreviously(selfReferenceURL)
      HttpArgParser.ParseIsAdminPage()
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

  static ParseIsAdminPage(){
    HttpArgParser.ADMIN_PAGE = `${window.location.href.includes('admin')}`
  }

  static ParseDebugMode(url){
    var debugMode = url.searchParams.get("debug");
    if(debugMode != undefined){
      HttpArgParser.DEBUG_MODE = debugMode
    }
  }

  static P

  static Print(){
    Logger.info(`HttpArgParser info:\n
      DebugMode: ${HttpArgParser.DEBUG_MODE}\n
      Admin Page: ${HttpArgParser.ADMIN_PAGE}\n
      GamePrevious Completion: ${HttpArgParser.GAME_COMPLETED_PREVIOUSLY}
    `)
  }
}


export default HttpArgParser;