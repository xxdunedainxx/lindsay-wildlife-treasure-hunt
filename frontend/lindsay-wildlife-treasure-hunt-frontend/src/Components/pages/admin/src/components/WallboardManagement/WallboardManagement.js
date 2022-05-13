import React from 'react';

import './WallboardManagement.css';

import Logger from '../../../../../../src/util/Logger';
import Configuration from '../../../../../../src/conf/Configuration';

import HttpWallboards from '../../http/HttpWallboards';

import WallboardInfo from './WallboardInfo';

export class WallboardManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      wallboards : "empty",
      createWallboardName: "new name",
      createWallboardDescription: "description",
      createWallboardURL: "https://google.com"
    }
    this.handleUpdateWallboard = this.handleUpdateWallboard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateWallboardData = this.updateWallboardData.bind(this)
    this.handleCreateWallboardUpdate = this.handleCreateWallboardUpdate.bind(this)
    this.handleCreateWallboard = this.handleCreateWallboard.bind(this)
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

    var wallboardData = {
      description: this.state.createWallboardDescription,
      url: this.state.createWallboardURL,
      name: this.state.createWallboardName
    }

    wallboards.createWallboard(wallboardData);
  }

  render() {
    return (
      <div class="loginFormWrapper" data-testid="test-login-container">
        Wallboards: <br />
        {this.__renderWallboards()}
        <br />
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

          <label for="createwallboardURL" class="passwordLabel">
            URL:
          </label>
          <textarea class="wallboardURL" id="loginInfoFormPassword" value={this.state.createWallboardURL} onChange={this.handleCreateWallboardUpdate}/>
          <br />

          <input class="loginSubmitBtn" type="submit" value="Submit" />
        </form>

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