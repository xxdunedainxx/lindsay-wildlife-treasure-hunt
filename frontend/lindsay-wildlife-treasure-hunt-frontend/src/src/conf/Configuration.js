// CHANGE TO DEV FOR LOCAL DEBUGGING
import * as confData from './dev_client_conf.json';

export class Configuration {
  static conf
  static logLevel 
  static headers
  static remoteHost
  static remoteHostPort
  static mockData = false

  static Init() {
    console.log(confData)
    
    Configuration.logLevel = confData.logging.level
    Configuration.conf = confData
    Configuration.headers = confData.headers
    Configuration.remoteHostProtocol = "http"
    Configuration.remoteHost = confData.backend.host
    Configuration.remoteHostPath = confData.backend.hostRoute
    Configuration.remoteHostPort = confData.backend.port
    Configuration.remoteHostHealthPort = confData.backend.appHealthPort
    Configuration.mockData = confData.dev.mockData
    if(confData.backend.ssl) {
      Configuration.remoteHostProtocol = "https"
    }
    Configuration.remoteEndpoint = `${Configuration.remoteHostProtocol}://${Configuration.remoteHost}:${Configuration.remoteHostPort}${Configuration.remoteHostPath}`
    Configuration.healthEndpoint = `${Configuration.remoteHostProtocol}://${Configuration.remoteHost}:${Configuration.remoteHostHealthPort}${Configuration.remoteHostPath}`
  }
}

export default Configuration;