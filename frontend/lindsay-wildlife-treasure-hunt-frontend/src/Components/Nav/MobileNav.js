import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Nav.css';
import lindsayLogo from '../../assets/lwe-logo.png'

export class MobileNav extends React.Component {

  constructor(props) {
    super(props)
    console.log("props")
    console.log(props)
  }

  render(){
    return (
      <div>
        <ul>
          <li>
              <Link to="/ui/about">
                <div className="mobileItemText">
                  About
                </div>
              </Link>
          </li>
          <li>
            <Link to="/ui/report">
              <div className="mobileItemText">
                Report an issue
              </div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default MobileNav;