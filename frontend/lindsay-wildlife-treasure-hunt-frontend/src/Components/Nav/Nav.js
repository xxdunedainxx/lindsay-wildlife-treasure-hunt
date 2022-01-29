import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Nav.css';
import {Version} from './Version';
import lindsayLogo from '../../assets/lwe-logo-background-white.png'

export class Nav extends React.Component {

  constructor(props) {
    super(props)
    console.log("props")
    console.log(props)
  }

  render(){
    return (
      <div id="nav-container">
        <ul className="nav-list" id="nav">
          <li id="nav-logo">
            <Link to="/ui/home">
              <div id="lindsay-logo-nav">
                <img src={lindsayLogo} alt="Logo" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/ui/home">
              <div className="game-nav-link nav-text">
                Game
              </div>
            </Link>
          </li>
          <li>
              <Link to="/ui/about">
                <div className="about-nav-link nav-text">
                  About
                </div>
              </Link>
          </li>
          <li>
            <Link to="/ui/report">
              <div className="report-issue-nav-link nav-text">
                Report an issue
              </div>
            </Link>
          </li>
          <li id="nav-version">
            <div className="version-text">
              <Version />
            </div>
          </li>
          <li id="nav-hamburger">
            <Link to="/ui/mobileNav" className="hamburger-link">
            <div className="hamburger-text">
              ☰
            </div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;