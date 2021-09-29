import * as confData from './client_conf.json';

export class Configuration {
  static conf
  static logLevel 
  static headers

  static Init() {
    console.log(confData)
    
    Configuration.logLevel = confData.logging.level
    Configuration.conf = confData
    Configuration.headers = confData.headers
  }
}

export default Configuration;