import * as confData from './client_conf.json';

export class Configuration {
  static conf
  static logLevel 
  static headers
  static remoteHost
  static remoteHostPort

  static Init() {
    console.log(confData)
    
    Configuration.logLevel = confData.logging.level
    Configuration.conf = confData
    Configuration.headers = confData.headers
    Configuration.remoteHostProtocol = "http"
    Configuration.remoteHost = confData.backend.host
    Configuration.remoteHostPort = confData.backend.port
    Configuration.remoteHostHealthPort = confData.backend.appHealthPort
    if(confData.backend.ssl) {
      Configuration.remoteHostProtocol = "https"
    }
    Configuration.remoteEndpoint = `${Configuration.remoteHostProtocol}://${Configuration.remoteHost}:${Configuration.remoteHostPort}`
    Configuration.healthEndpoint = `${Configuration.remoteHostProtocol}://${Configuration.remoteHost}:${Configuration.remoteHostHealthPort}`
  }
}

export default Configuration;