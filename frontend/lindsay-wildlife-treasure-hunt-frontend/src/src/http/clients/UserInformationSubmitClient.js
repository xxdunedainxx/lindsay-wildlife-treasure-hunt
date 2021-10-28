import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';
import GameController from '../../game/Game';

function deleteProgress() {
  GameController.resetGame();
  GameController.gameState.gameComplete = false;
  GameController.saveState();
  window.location.href = '/ui/game';
}

class UserInformationSubmitClient extends HttpClient {
  constructor(url) {
    super(url)
  }

  successfulRequest(result){
    Logger.info("Successful user submission request")
    Logger.info(JSON.stringify(result))
    if(result.response == 'Invalid Request') {
      alert('invalid email provided.. :(')
      return false;
    } else{
      alert('you should receive an email with your certificate shortly!')
      deleteProgress()
      return  true;
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