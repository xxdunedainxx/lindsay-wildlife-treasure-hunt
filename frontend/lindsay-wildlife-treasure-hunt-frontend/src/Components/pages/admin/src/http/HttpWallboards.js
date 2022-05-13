import Logger from '../../../../../src/util/Logger';
import Session from '../../../../../src/util/Session';
import Configuration from '../../../../../src/conf/Configuration';
import HttpClient from '../../../../../src/http/HttpClient';

class HttpWallboards extends HttpClient {

  constructor(url) {
    let headers = {
       'Content-Type': 'application/json',
       'X-Authentication': Session.GetJwtToken()
    }
    super(url, headers)
  }

  successfulGetWallboards(result){
    Logger.info("Got wallboards")
    console.log(result)
  }

  successfullUpdateWallboards(result){
    Logger.info("updated wallboards")
    console.log(result)
    alert("Wallboards updated")
  }

  failedGetWallboards(result) {
    Logger.info("Failed to get wallboards")
    alert("something went wrong while getting wallboard data")  
  }

  failedCreateWallboard(result){
    alert('failed to create wallboard')
  }

  successCreateWallboard(result) {
    alert('created wallboard!')
    window.location.reload()
  }

  async createWallboard(wallboardData){
    return this.post(
      "wallboards",
      wallboardData,
      this.successCreateWallboard,
      this.failedCreateWallboard
    )
  }

  async listWallBoards(successfullWallboardMethod){
    this.successfullWallboardMethod = successfullWallboardMethod
    return this.get(
      "wallboards",
      this.successfullWallboardMethod,
      this.failedGetWallboards
    )
  }

  async updateWallboards(wallboardId, nWallboard){
    return this.put(
      `wallboards/${wallboardId}`,
      {
        "name" : wallboardId,
        "description": nWallboard["description"],
        "url": nWallboard["url"]
      },
      this.successfullUpdateWallboards,
      this.failedGetWallboards
    )
  }

}

export default HttpWallboards;