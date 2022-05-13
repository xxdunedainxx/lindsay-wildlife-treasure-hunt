import Logger from '../../../../../src/util/Logger';
import Session from '../../../../../src/util/Session';
import Configuration from '../../../../../src/conf/Configuration';
import HttpClient from '../../../../../src/http/HttpClient';

class HttpFileServer extends HttpClient {

  constructor(url) {
    let headers = {
       'X-Authentication': Session.GetJwtToken()
    }
    super(url, headers)
  }

  successfulGetWallboards(result){
    Logger.info("Got wallboards")
    console.log(result)
  }

  successfulFileUpload(result){
    Logger.info("updated file")
    console.log(result)
    alert("Success")
    window.location.reload()
  }

  failedFileUpload(result) {
    Logger.info("Failed to upload file")
    alert("something went wrong...")  
  }

  async getFiles(getFilesCallback){
    return this.get(
      `files/list`,
      getFilesCallback,
      this.failedFileUpload
    )
  }


  async uploadFile(fileData){
    return this.post(
      `files/upload`,
      fileData,
      this.successfulFileUpload,
      this.failedFileUpload,
      true
    )
  }

  async deleteFile(fileId){
    return this.delete(
      `files/${fileId}`,
      this.successfulFileUpload,
      this.failedFileUpload,
      true
    )
  }

}

export default HttpFileServer;