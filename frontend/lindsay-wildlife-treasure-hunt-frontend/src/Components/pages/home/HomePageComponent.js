import React from 'react';
import ZBarcodeScanner from '../../BarcodeScanner/ZBarcodeScanner';
import LordRichard from '../../Avatars/LordRichard/LordRichard';
import './HomePageComponent.css';
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
  }

  render(){
    return (
      <div>
        <div className="welcome-message">
         Welcome to our Biodiversity Scavenger Hunt!
        </div>
        <LordRichard />
        <div className="instructions">
          To play, match each clue to the correct specimen located in the California Biodiversity exhibit and win a special surprise!
        </div>
        <br />
        <Link to="/ui/game" className="start-button">
          Get Started!
        </Link>
        <div style={this.videoStyle}>
        <ZBarcodeScanner />
        </div>
      </div>
    );
  }
}

export default HomePage;