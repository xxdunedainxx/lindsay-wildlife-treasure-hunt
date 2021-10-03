import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';
import GameController from '../../game/Game';

class GameControllerClient extends HttpClient {

  constructor(url) {
    super(url)
  }

  successfulGetDB(result){
    alert(result)
    GameController.init()
  }

  couldNotGetDB(error){
    alert(error)
  }

  async getDb(){
    return this.get(
      "scavenger_hunt",
      this.successfulGetDB,
      this.couldNotGetDB
    )
  }
}

export default GameControllerClient;