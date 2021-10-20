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
        Welcome!
        <Link to="/ui/game">
          Start!
        </Link>
      </div>
    );
  }
}

export default HomePage;