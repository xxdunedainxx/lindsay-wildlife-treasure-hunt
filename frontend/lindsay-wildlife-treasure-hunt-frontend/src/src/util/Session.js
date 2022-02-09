import Logger from './Logger';
import GameController from '../game/Game';

export class Session {
  static sessionKey = 'lindsaySessionData'

  static Init(){
    Logger.info('init session object')
  }

  static CheckIfExists(){
    return localStorage.getItem(Session.sessionKey) != null
  }

  // loads session data if it exists, otherwise, return a null object.
  // Callers to session client should set / update session state
  static FetchSessionData(){
    Logger.info('fetching session data')
    if(Session.CheckIfExists() == false) {
      return null
    } else {
      return JSON.parse(localStorage.getItem(Session.sessionKey))
    }
  }

  static GetSessionID(){
    if(Session.CheckIfExists()) {
      return Session.FetchSessionData().sessionID
    } else {
      return 'no-session-established'
    }
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

  static ClearSession(){
    localStorage.removeItem(Session.sessionKey)
  }
}

export default Session;