import Logger from '../../../../../src/util/Logger';
import Session from '../../../../../src/util/Session';
import Configuration from '../../../../../src/conf/Configuration';
import HttpClient from '../../../../../src/http/HttpClient';

class HttpPreflightAuthCheck extends HttpClient {

  constructor(url) {
    let headers = {
       'Content-Type': 'application/json',
       'X-Authentication': Session.GetJwtToken()
    }
    super(url, headers)
  }

  successfulAuthCheck(result){
    Logger.info("user has good token")
  }

  failedAuthCheck(result) {
    Logger.info("user has old or no token")
    window.location.href = '/ui/admin/login';
  }

  async check(){
    return this.post(
      "test_jwt",
      {},
      this.successfulAuthCheck,
      this.failedAuthCheck
    )
  }

}

export default HttpPreflightAuthCheck;