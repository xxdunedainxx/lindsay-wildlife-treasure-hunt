import Logger from './Logger';
import GameController from '../game/Game';

export class Session {
  static sessionKey = 'lindsaySessionData'

  static Init(){
    Logger.info('init session object')
    Session.FetchSessionData()
  }

  static CheckIfExists(){
    return localStorage.getItem(Session.sessionKey) != null
  }

  // loads session data if it exists, otherwise, creates it
  static FetchSessionData(){
    Logger.info('fetching session data')
    if(Session.CheckIfExists() == false) {
      Logger.info('Session data does not exist, setting')
      Session.SetSessionData(GameController.gameState)
    }
    return JSON.parse(localStorage.getItem(Session.sessionKey))
  }

  static SetSessionData(data) {
    data['sessionID'] = Session.GenerateSessionID()
    localStorage.setItem(Session.sessionKey, JSON.stringify(data))
  }

  static GenerateSessionID(){
    var sessionsID=(Math.random() + 1).toString(36).replace('.','');
    Logger.info(`Session ID for this session: ${sessionsID}`);
    return sessionsID;
  }
}

export default Session;