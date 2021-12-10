import React from 'react';
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
  }

  render(){
    return (
      <div>
        <div className="welcomeMessage">
         Welcome to the Lindsay Wildlife’s Biodiversity Scavenger Hunt. To play, match each clue to the correct specimen located in the California Biodiversity exhibit and win a special surprise!
        </div>
        <br />
        <Link to="/ui/game" className="startButton">
          Get Started!
        </Link>
      </div>
    );
  }
}

export default HomePage;