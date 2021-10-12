import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';
import Configuration from '../../conf/Configuration';
import MockData from '../../data/MockData';
import GameController from '../../game/Game';

class GameControllerClient extends HttpClient {

  constructor(url) {
    super(url)
  }

  successfulGetDB(result){
    GameController.Init()
    Logger.info(`Got DB :${JSON.stringify(result)}`)
    GameController.gameState.gameInfo = result
  }

  couldNotGetDB(error){
    alert(error)
  }

  async getDb(){
    // toggle mockData off to fetch data from a live API server
    if(Configuration.mockData == true){
      GameController.Init()
      GameController.gameState.gameInfo = MockData.exampleMockedDataOne
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