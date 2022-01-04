import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';
import Session from '../../util/Session';
import Configuration from '../../conf/Configuration';

class RemoteLogger extends HttpClient {



  constructor(url) {
    super(url)
  }

  static getDeviceInformation(){
    return `
      agent: ${navigator.userAgent},
      vendor: ${navigator.vendor},
      appVersion: ${navigator.appVersion},
      language: ${navigator.language}
    `;
  }

  successfulRequest(result){
    Logger.info("Successful log request")
  }

  failedRequest(result) {
    Logger.error("Failed remote logging...")
  }

  async log(data){
    var userLogData={
      logData : `${data}`,
      sessionID: Session.GetSessionID(),
      deviceInfo : RemoteLogger.getDeviceInformation(),
      version:   Configuration.version
    }

    return this.post(
      "quilogs",
      userLogData,
      this.successfulRequest,
      this.failedRequest
    )
  }
}

export default RemoteLogger;