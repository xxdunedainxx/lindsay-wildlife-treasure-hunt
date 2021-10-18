import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Nav.css';
import lindsayLogo from '../../assets/lwe-logo.png'

export class Nav extends React.Component {

  constructor(props) {
    super(props)
    console.log("props")
    console.log(props)
  }

  render(){
    return (
      <div>
        <ul id="nav">
          <li><Link to="/ui/home">Lindsay Logo here</Link></li>
          <li><Link to="/ui/game">Start!</Link></li>
          <li><Link to="/ui/about">About</Link></li>
          <li><Link to="/ui/report">Report a bug</Link></li>
        </ul>
      </div>
    );
  }
}

export default Nav;