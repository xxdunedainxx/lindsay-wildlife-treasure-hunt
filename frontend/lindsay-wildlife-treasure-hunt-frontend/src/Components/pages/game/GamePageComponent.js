import React from 'react';
import './GamePageComponent.css';

import {PageBody} from '../../PageBody/PageBody';
import {GameDisplay} from '../../GameDisplay/GameDisplay';

import GameControllerClient from '../../../src/http/clients/GameControllerClient';
import Configuration from '../../../src/conf/Configuration';
import HttpArgParser from '../../../src/util/HttpArgParser';
import {ReportAnIssueDisplay} from '../../ReportAnIssueDisplay/ReportAnIssueDisplay';
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

  __reportFeedbackLink(){
    if(HttpArgParser.GAME_COMPLETED_PREVIOUSLY == "true") {
      return (
        <div>        
          
          <ReportAnIssueDisplay
            messageHeader="Have feedback? We want to hear from you!"
            inputBodyText="Fill in feedback here"
          />
        </div>
      )
    } else {
      return ('')
    }
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
           {this.__reportFeedbackLink()}
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



