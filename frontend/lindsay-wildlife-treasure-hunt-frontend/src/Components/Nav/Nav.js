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
      <div id="navContainer">
        <ul id="nav">
          <li id="navLogo">
            <Link to="/ui/home">
              <div id="lindsayLogoNav">
                <img src={lindsayLogo} alt="Logo" />
              </div>
            </Link>
          </li>
          <li>
              <Link to="/ui/about">
                <div className="navText">
                  About
                </div>
              </Link>
          </li>
          <li>
            <Link to="/ui/report">
              <div className="navText">
                Report a bug
              </div>
            </Link>
          </li>
          <li id="navHamburger">
            <Link to="/ui/mobileNav">
            <div className="hamburgerText">
              ☰
            </div>
            </Link>
          </li>
          <li id="navVersion">
            <div className="versionText">
              <Version />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;