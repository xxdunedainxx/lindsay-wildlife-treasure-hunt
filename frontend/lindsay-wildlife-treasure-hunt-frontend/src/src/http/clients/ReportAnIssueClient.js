import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';
import Session from '../../util/Session';
import Configuration from '../../conf/Configuration';

class ReportAnIssueClient extends HttpClient {

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
    Logger.info("Successful report issue request")
    alert("Thank you for your feedback!")
    window.location.href = '/ui/home';
  }

  failedRequest(error) {
    Logger.error(`failed submitting an issue report... ${JSON.stringify(error)}`)
    alert("Failed to submit issue.")
  }

  async report(data){
    var userIssueReport={
      message : `${data}`,
      sessionID: Session.FetchSessionData().sessionID,
      deviceInfo : ReportAnIssueClient.getDeviceInformation(),
      version:   Configuration.version
    }

    return this.post(
      "report",
      userIssueReport,
      this.successfulRequest,
      this.failedRequest
    )
  }
}

export default ReportAnIssueClient;