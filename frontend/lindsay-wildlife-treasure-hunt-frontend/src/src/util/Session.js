import Logger from './Logger';

export class Session {
  static sessionKey = 'lindsaySessionData'
  static placeHolderData = {
    "gameStarted" : false
  }

  static Init(){
    Logger.info('init session object')
    if(Session.CheckIfExists() == false){
      Logger.info('Session data does not exist, setting')
      Session.SetSessionData(Session.placeHolderData)
    }
  }

  static CheckIfExists(){
    return localStorage.getItem(Session.sessionKey) != null
  }

  static FetchSessionData(){
    Logger.info('fetching session data')
    if(Session.CheckIfExists == false) {
      Session.Init()
    }
    return JSON.parse(localStorage.getItem(Session.sessionKey))
  }

  static SetSessionData(data) {
    localStorage.setItem(Session.sessionKey, JSON.stringify(data))
  }
}

export default Session;