import React from 'react';

import './WallboardManagement.css';

import Logger from '../../../../../../src/util/Logger';
import Configuration from '../../../../../../src/conf/Configuration';

import HttpWallboards from '../../http/HttpWallboards';

import WallboardInfo from './WallboardInfo';

export class WallboardProfiles {
  static IMAGE      = "image"
  static SLIDE_SHOW = "slideshow"
  static CHOICES    = [
    WallboardProfiles.IMAGE,
    WallboardProfiles.SLIDE_SHOW
  ]
}

export class WallboardManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      wallboards : "empty",
      createWallboardName: "new name",
      createWallboardDescription: "description",
      createWallboardURL: "https://google.com",
      createWallboardURLs: [],
      createWallboardProfile: WallboardProfiles.IMAGE,
      createWallboardIntervalMinutes: 5 
    }
    this.handleUpdateWallboard = this.handleUpdateWallboard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateWallboardData = this.updateWallboardData.bind(this)
    this.handleCreateWallboardUpdate = this.handleCreateWallboardUpdate.bind(this)
    this.handleCreateWallboard = this.handleCreateWallboard.bind(this)
    this.addWallboardUrl = this.addWallboardUrl.bind(this)
  }

  updateWallboardData(nData){
    console.log(nData)
    this.setState(
      {
        wallboards : nData
      }
    )
  }

  __renderWallboards(){
    if(typeof(this.state.wallboards) == 'string'){
      return this.state.wallboards
    } else {
      let wallboardsToIter = Object.entries(this.state.wallboards)
      let rBoards = wallboardsToIter.map(
        (([key, value]) =>
          <p class="wallboard-info">
            <form onSubmit={this.handleUpdateWallboard} id={key}>
              <b>Name</b>:{key}< br/>
              <b>Description</b>:<textarea id={key} class="wallboard-value description" value={value.description} onChange={this.handleChange}/>< br/>
              <b>Url</b>:<textarea id={key} class="wallboard-value url" value={value.url} onChange={this.handleChange}/>
              <input class="loginSubmitBtn" type="submit" value="Submit" />
            </form>
          </p>
        )
      )
      return rBoards
    }
  }

  addWallboardUrl(){
    let wallboardURLSCache = this.state.createWallboardURLs
    wallboardURLSCache.push('url goes here')
    this.setState(
      {
        createWallboardURLs: wallboardURLSCache
      }
    )
  }

  __renderAddWallboardUrlInput(){
    return(
      <div>
        <button onClick={this.addWallboardUrl}>Add a URL</button>
      </div>
    )
  }

  __renderCreateWallboardURLs(){
      let urlsToIter = Object.entries(this.state.createWallboardURLs)
      if(urlsToIter.length == 0) {
        return ('')
      }
      let rUrls = urlsToIter.map(
        (([key, value]) =>
          <div>
            <label for={"createWallboardURLList-" + key} class="passwordLabel">
              URL:
            </label>
            <textarea class="wallboardURLList" id={"createWallboardURLList-" + key} value={value} onChange={this.handleCreateWallboardUpdate}/>
            <br />

          </div>
        )
      )
      return rUrls
  }

  handleChange(event) {
   console.log(event)
   if(event.target.className.includes('wallboard-value')){
    console.log("Updating state")
    let wallboardValueToUpdate = event.target.className.split(' ')[1]
    let wallboardCache = this.state
    wallboardCache.wallboards[event.target.id][wallboardValueToUpdate] = event.target.value
    console.log(wallboardCache)
    this.setState(
      wallboardCache
    )
   }
  }



  handleUpdateWallboard(event) {
    event.preventDefault()
    console.log(event)
    var wallboards = new HttpWallboards(
      `${Configuration.remoteEndpoint}`
    );

    wallboards.updateWallboards(
      event.target.id,
      {
        "description" : event.target[0].value,
        "url" : event.target[1].value,
      }
    )

  }

  __handleWallboardUrlListableUpdate(event){
    let id = event.target.id.split('-')[1]
    let wallboardURLsCache = this.state.createWallboardURLs
    wallboardURLsCache[id] = event.target.value

    this.setState(
      {
        createWallboardURLs: wallboardURLsCache
      }
    )
  }

  handleCreateWallboardUpdate(event){
    event.preventDefault()
    console.log(event)
    if(event.target.id == "wallboardName"){
      this.setState(
        {
          createWallboardName: event.target.value
        }
      )
    } else if(event.target.id == "wallboardDescription"){
      this.setState(
        {
          createWallboardDescription: event.target.value
        }
      )
    } else if(event.target.id == "createwallboardProfilePicker"){
      this.setState(
        {
          createWallboardProfile: event.target.value
        }
      )      
    } else if(event.target.id == "slideshowInterval"){
      this.setState(
        {
          createWallboardIntervalMinutes: event.target.value
        }
      )
    } else if(event.target.className == "wallboardURLList"){
      this.__handleWallboardUrlListableUpdate(event)
    } else {
      this.setState(
        {
          createWallboardURL: event.target.value
        }
      )
    }
  }

  handleCreateWallboard(event){
    event.preventDefault()
    console.log(event)
    var wallboards = new HttpWallboards(
      `${Configuration.remoteEndpoint}`
    );
    Logger.info("trying to create wallboard data")

    let urlParamToPass = null

    if(this.state.createWallboardProfile == WallboardProfiles.IMAGE){
      urlParamToPass = this.state.createWallboardURL 
    } else {
      urlParamToPass = this.state.createWallboardURLs
    }

    var wallboardData = {
      description: this.state.createWallboardDescription,
      url: urlParamToPass,
      name: this.state.createWallboardName,
      profile: this.state.createWallboardProfile,
      interval: this.state.createWallboardIntervalMinutes
    }

    wallboards.createWallboard(wallboardData);
  }

  __renderWallboardURLUI(){
    if(this.state.createWallboardProfile == WallboardProfiles.SLIDE_SHOW){
      return (
        <div>
          {this.__renderCreateWallboardURLs()}
          {this.__renderAddWallboardUrlInput()}
        </div>
      )
    } else {
      return(
        <div>
          <label for="createwallboardURL" class="passwordLabel">
            URL:
          </label>
          <textarea class="wallboardURL" id="createwallboardURL" value={this.state.createWallboardURL} onChange={this.handleCreateWallboardUpdate}/>
          <br />
        </div>
      )
    }
  }

  __renderSlideShowExtraFields(){
    if(this.state.createWallboardProfile == WallboardProfiles.SLIDE_SHOW){
      return (
          <div>
          <label for="slideshowInterval" class="slideshowInterval">
            Interval (minutes) :
          </label>
          <textarea class="slideshowInterval" id="slideshowInterval" value={this.state.createWallboardIntervalMinutes} onChange={this.handleCreateWallboardUpdate}/>
          <br />
          </div>
      )
    } else {
      return('')
    }
  }

  render() {
    return (
      <div class="loginFormWrapper" data-testid="test-login-container">
        <h3>Wallboard Manager</h3>
        <br />
        <h3>Create a new wallboard</h3>
        <form onSubmit={this.handleCreateWallboard}>

          <label for="createwallboardName">
            Name:
          </label>
          <textarea class="createwallboardName" id="wallboardName" value={this.state.createWallboardName} onChange={this.handleCreateWallboardUpdate}/>
          <br />

          <label for="createwallboardDescription">
            Description:
          </label>
          <textarea class="createwallboardDescription" id="wallboardDescription" value={this.state.createWallboardDescription} onChange={this.handleCreateWallboardUpdate}/>
          <br />

          {this.__renderWallboardURLUI()}
          
          <label for="createwallboardProfilePicker" class="passwordLabel">
            Profile
          </label>
          {this.__renderSlideShowExtraFields()}
          <select id="createwallboardProfilePicker" class="createwallboardProfilePicker" value={this.state.createWallboardProfile} onChange={this.handleCreateWallboardUpdate}>
            <option value={WallboardProfiles.IMAGE}>Image</option>
            <option value={WallboardProfiles.SLIDE_SHOW}>Slide show</option>
          </select>

          <input class="loginSubmitBtn" type="submit" value="Submit" />
        </form>
        <br />
        Configured Wallboards: <br />
        {this.__renderWallboards()}
      </div>
    );
  }

  componentDidMount(){
    var wallboards = new HttpWallboards(
      `${Configuration.remoteEndpoint}`
    );
    Logger.info("trying to get wallboard data")

    wallboards.listWallBoards(this.updateWallboardData);
  }

}

export default WallboardManagement;