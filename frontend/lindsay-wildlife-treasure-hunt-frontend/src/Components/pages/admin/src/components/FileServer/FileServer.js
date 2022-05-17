import './FileServer.css';

import React from 'react';

import Logger from '../../../../../../src/util/Logger';
import Configuration from '../../../../../../src/conf/Configuration';

import HttpFileServer from '../../http/HttpFileServer';

export class FileServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initially, no file is selected
      selectedFile: null,
      files: 'loading'
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.updateFileServerInfoData = this.updateFileServerInfoData.bind(this);
  }

  onFileChange(event){
    console.log(event)
    this.setState(
      { 
        selectedFile: event.target.files[0] 
      }
    );
  }

  onFileUpload(event){
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    var fileServer = new HttpFileServer(
      `${Configuration.remoteEndpoint}`
    );

    fileServer.uploadFile(formData)
  }

  deleteFile(event){
    console.log(event)
    var fileServer = new HttpFileServer(
      `${Configuration.remoteEndpoint}`
    );

    fileServer.deleteFile(event.target.id)
  }

  __renderFiles(){
    if(typeof(this.state.files) == 'string'){
      return this.state.files
    } else {
      let filesToIter = Object.entries(this.state.files)
      let rFiles = filesToIter.map(
        (([key, value]) =>
          <p class="file-info">
            <form onSubmit={this.deleteFile} id={key}>
              <b>Name</b>:{key}<br/>
              <b>Url</b>: {value}<br/>
              <img class="fileServerImage" src={value}/>
              <input class="loginSubmitBtn" type="submit" value="Remove File (FEATURE NOT AVAILABLE)" />
            </form>
          </p>
        )
      )
      return rFiles
      //return rBoards
    }
  }

  updateFileServerInfoData(files){
    console.log(files)
    var fileMappings = {

    }

    for(var i = 0; i < files.names.length; i++){
      fileMappings[files.names[i]] = `${Configuration.remoteEndpoint}/files/get_file/${files.names[i]}`
    }

    this.setState(
      {
        files: fileMappings
      }
    )
  }

  componentDidMount(){
    var fileServer = new HttpFileServer(
      `${Configuration.remoteEndpoint}`
    );
    Logger.info("trying to get file server data")

    fileServer.getFiles(this.updateFileServerInfoData);
  }


  render() {
    return (
      <div class="fileServer" data-testid="test-login-container">
        <h3>File Server</h3>
        <br />
        Upload a new file:<br/>
         <input type="file" onChange={this.onFileChange} />
         <br/>
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        <br/>
        List of current available files:<br/>
        {this.__renderFiles()}
      </div>
    );
  }
}

export default FileServer;