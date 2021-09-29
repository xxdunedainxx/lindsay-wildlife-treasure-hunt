import HttpClient from '../HttpClient' 

import Logger from '../../util/Logger';

class TestClient extends HttpClient {
  constructor(url) {
    super(url)
  }

  successfulTest(result){
    if('response' in result) {
      Logger.info("successful test request!")
    } else {
      Logger.error('bad response back :(')
      throw new Error('bad response')
    }
  }

  failedTest(result) {
    Logger.error("failed test request")
  }

  testRequest(){
    this.get(
      "test",
      this.successfulTest,
      this.failedTest
    )
  }
}

export default TestClient;