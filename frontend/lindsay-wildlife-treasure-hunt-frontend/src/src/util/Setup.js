import Configuration from '../conf/Configuration';
// import GameController from '../game/Game';
import Logger from './Logger';
import Session from './Session';
import HttpArgParser from './HttpArgParser';

export class Setup {
  static Run(){
    console.log('executing setup :)')
    Configuration.Init()
    Logger.Init()
    HttpArgParser.Init()
    // GameController.Init()
    // if game already started, load game data
  }
}

export default Setup;