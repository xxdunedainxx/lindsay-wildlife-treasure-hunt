import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';
import Session from '../../util/Session';
import Configuration from '../../conf/Configuration';
import MockData from '../../data/MockData';
import GameController from '../../game/Game';

class GameControllerClient extends HttpClient {

  static dependentPage = null

  constructor(url) {
    super(url)
  }

  successfulGetDB(result){
    GameController.gameState.gameInfo = result
    Session.OverrideGameStateSessionData()
    GameController.Init()
    if(GameControllerClient.dependentPage != null){
      GameControllerClient.dependentPage.enablePage()
    }
  }

  couldNotGetDB(error){
    alert(error)
  }

  async getDb(){
    // toggle mockData off to fetch data from a live API server
    if(Configuration.mockData == true){
      GameController.Init()
      GameController.gameState.gameInfo = MockData.exampleMockedDataOne
      Session.OverrideGameStateSessionData()
      if(GameControllerClient.dependentPage != null){
        GameControllerClient.dependentPage.enablePage()
      }
    } else {
    return this.get(
      "scavenger_hunt",
      this.successfulGetDB,
      this.couldNotGetDB
    )
    }
  }
}

export default GameControllerClient;