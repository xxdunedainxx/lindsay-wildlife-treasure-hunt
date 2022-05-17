import Logger from '../../../../../src/util/Logger';
import Session from '../../../../../src/util/Session';
import Configuration from '../../../../../src/conf/Configuration';
import HttpClient from '../../../../../src/http/HttpClient';

class HttpLogin extends HttpClient {

  constructor(url) {
    super(url)
  }

  successfulAuthCheck(result){
    Logger.info("user loged in!")
    Session.SetJwtToken(result['jwt'])
    alert('Your loged in!')
    window.location.href = '/ui/admin';
  }

  failedLogin(result) {
    Logger.info("user failed to login")
    alert('Try again')
  }

  async login(username, password){
    return this.post(
      "login",
      {
        "username": username,
        "password": password
      },
      this.successfulAuthCheck,
      this.failedLogin
    )
  }

}

export default HttpLogin;