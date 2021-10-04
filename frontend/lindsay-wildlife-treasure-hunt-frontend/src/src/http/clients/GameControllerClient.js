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
    GameController.gameState.gameInfo = result
  }

  couldNotGetDB(error){
    alert(error)
  }

  async getDb(){
    // toggle mockData off to fetch data from a live API server
    if(Configuration.mockData == true){
      GameController.gameState.gameInfo = MockData.exampleMockedDataOne
      GameController.Init()
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