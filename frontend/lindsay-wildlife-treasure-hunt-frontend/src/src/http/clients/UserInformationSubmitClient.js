import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';

class UserInformationSubmitClient extends HttpClient {
  constructor(url) {
    super(url)
  }

  successfulRequest(result){
    Logger.info("Successful user submission request")
    if(result.response == 'invalid email') {
      alert('invalid email provided.. :(')
    } else{
      alert('you should receive an email with your certificate shortly!')
    }
  }

  failedRequest(result) {
    Logger.error("failed email submission request")
    alert('something bad happened :(')
  }

  async submitUserRequest(email, username){
    var userRequestData={
      email : `${email}`,
      username: `${username}`
    }

    return this.post(
      "mail",
      userRequestData,
      this.successfulRequest,
      this.failedRequest
    )
  }
}

export default UserInformationSubmitClient;