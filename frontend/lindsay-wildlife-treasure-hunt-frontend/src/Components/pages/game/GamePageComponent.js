import React from 'react';
import './GamePageComponent.css';

import {PageBody} from '../../PageBody/PageBody';
import {GameDisplay} from '../../GameDisplay/GameDisplay';

import GameControllerClient from '../../../src/http/clients/GameControllerClient';
import Configuration from '../../../src/conf/Configuration';

export class GamePage extends React.Component {
  static gamePageInstance = null

  enablePage(){
    this.setState(
      {
        gameStateLoaded: true
      }
    );
  }

  async fetchGameState(){
    var gameControllerClient = new GameControllerClient(Configuration.remoteEndpoint)
    
    // ensures callback to this page to toggle it on
    GameControllerClient.dependentPage=this;
    
    await gameControllerClient.getDb()
  }


  //after the component is mounted, fetch game state data
  componentDidMount(){
    this.fetchGameState()
  }

  constructor(props) {
    super(props)
    GamePage.gamePageInstance = this;
    this.state = {
      gameStateLoaded: false
    }
  }

  render(){
    // if state is loaded, return gamedisplay, otherwise display loading message
    if(this.state.gameStateLoaded) {
      return (
        <div>
           <PageBody />
          <GameDisplay />
        </div>
      );
    } else {
      return (
        <div>
          <PageBody />
          Loading...
        </div>
      );
    }
  }
}

export default GamePage;



