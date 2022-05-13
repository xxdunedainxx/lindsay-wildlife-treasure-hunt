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
      wallboards : "empty"
    }
    this.handleUpdateWallboard = this.handleUpdateWallboard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateWallboardData = this.updateWallboardData.bind(this)
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

  render() {
    return (
      <div class="loginFormWrapper" data-testid="test-login-container">
        Wallboards: <br />
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