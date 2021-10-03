import Configuration from '../conf/Configuration';
import GameController from '../game/Game';
import Logger from './Logger';
import Session from './Session';

export class Setup {
  static Run(){
    console.log('executing setup :)')
    Configuration.Init()
    Logger.Init()
    GameController.Init()
    // if game already started, load game data
  }
}

export default Setup;