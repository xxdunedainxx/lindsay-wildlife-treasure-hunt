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
      <div id="navContainer">
        <ul id="nav">
          <li>
            <Link to="/ui/home">
              <div id="lindsayLogoNav">
                <img src={lindsayLogo} alt="Logo" />
              </div>
            </Link>
          </li>
          <li>
              <Link to="/ui/about">
                <div className="divText">
                  About
                </div>
              </Link>
          </li>
          <li>
            <Link to="/ui/report">
              <div className="divText">
                Report a bug
              </div>
            </Link>
          </li>
          <li id="navHamburger">
            <Link to="/ui/mobileNav">
              ☰
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;