import React from 'react';
import ZBarcodeScanner from '../../BarcodeScanner/ZBarcodeScanner';
import LordRichard from '../../Avatars/LordRichard/LordRichard';
import './HomePageComponent.css';
import Session from '../../../src/util/Session';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.videoStyle = {
      visibility: "hidden",
      display: "none"
    }
    this.DualButtonStyle={
      fontSize: "15px"
    }
  }

  resetSession(){
    Session.ClearSession()
    window.location.href = '/ui/game';
  }

  __getGameLinkButtons(){
    if(Session.CheckIfExists()) {
      return (<div data-testid="test-home-page-session">
        <Link style={this.DualButtonStyle} to="/ui/game" className="startButton">
          Continue Game
        </Link>
        <br />
        <br />
        <button style={this.DualButtonStyle} className="game-button"
          onClick={this.resetSession}
        >
          Clear Progress
        </button>
      </div>)
    } else {
      return (
        <div data-testid="test-home-page-no-session">
          <Link to="/ui/game" className="startButton">
            Get Started!
          </Link>
        </div>
      )
    }
  }

  render(){
    return (
      <div>
        <div className="welcomeMessage">
         Welcome to our Biodiversity Scavenger Hunt!
        </div>
        <LordRichard />
        <div className="instructions">
          To play, match each clue to the correct specimen located in the California Biodiversity exhibit and win a special surprise!
        </div>
        <br />
        {this.__getGameLinkButtons()}
        <div style={this.videoStyle}>
        <ZBarcodeScanner />
        </div>
      </div>
    );
  }
}

export default HomePage;