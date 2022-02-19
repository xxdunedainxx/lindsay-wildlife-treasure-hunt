import * as confFile from './client_conf.json';

import {env} from './env/env.js';

export class Configuration {
  static conf
  static logLevel 
  static headers
  static remoteHost
  static remoteHostPort
  static mockData = false

  static Init() {
    console.log(env)
    console.log(`Environment: ${env}`)
    console.log(confFile)
    let confData = confFile["default"][env]
    Configuration.isProd = (env == "prod")
    Configuration.version = "1.0.0"
    Configuration.logLevel = confData.logging.level
    Configuration.conf = confData
    Configuration.headers = confData.headers
    Configuration.remoteHostProtocol = "http"
    Configuration.remoteHost = confData.backend.host
    Configuration.remoteHostPort = confData.backend.port
    Configuration.remoteHostHealthPort = confData.backend.appHealthPort
    Configuration.remoteHostPath = confData.backend.hostRoute
    Configuration.mockData = confData.dev.mockData
    if(confData.backend.ssl) {
      Configuration.remoteHostProtocol = "https"
    }
    Configuration.remoteEndpoint = `${Configuration.remoteHostProtocol}://${Configuration.remoteHost}:${Configuration.remoteHostPort}${Configuration.remoteHostPath}`
    Configuration.healthEndpoint = `${Configuration.remoteHostProtocol}://${Configuration.remoteHost}:${Configuration.remoteHostHealthPort}${Configuration.remoteHostPath}`
  }
}

export default Configuration;