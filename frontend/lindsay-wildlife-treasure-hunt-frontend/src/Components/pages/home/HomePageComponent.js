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
          Welcome to the Lindsay Wildlife Bio-Diversity treasure hunt. The goal of the treasure hunt is to match all the given clues with various exhibits at Lindsay Wildlife Experience!
        </div>
        <Link to="/ui/game" className="startButton">
          Lets go!
        </Link>
      </div>
    );
  }
}

export default HomePage;