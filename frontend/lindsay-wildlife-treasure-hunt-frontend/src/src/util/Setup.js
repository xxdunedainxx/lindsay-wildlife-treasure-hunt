import Configuration from '../conf/Configuration';
import Logger from './Logger';
import Session from './Session';

export class Setup {
  static Run(){
    console.log('executing setup :)')
    Configuration.Init()
    Logger.Init()
    Session.Init()
  }
}

export default Setup;