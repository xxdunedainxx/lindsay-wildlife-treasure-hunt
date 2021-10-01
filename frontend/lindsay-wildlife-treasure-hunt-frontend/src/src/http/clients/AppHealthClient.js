import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';

class AppHealthClient extends HttpClient {
  static HEALTHY_INDICATOR='HEALTHY'

  constructor(url) {
    super(url)
  }

  appHealthy(result){
    Logger.info("successful appHealthy request!")
    if(result["status"] != AppHealthClient.HEALTHY_INDICATOR) {
      Logger.error("App is in unhealthy state. Will query dependencies")
      throw new Error('remote app is not healthy?')
    } else {
      Logger.info("app is healthy and ready!")
    }
  }

  appUnhealthy(result) {
    Logger.error("failed test request")
    throw new Error('????')
  }

  async health(){
    return this.get(
      "health",
      this.appHealthy,
      this.appUnhealthy
    )
  }

  async dependencies(){
    this.get(
      "dependencies"
    )
  }
}

export default AppHealthClient;