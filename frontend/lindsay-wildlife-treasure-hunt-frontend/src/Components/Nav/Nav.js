import React from 'react';
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
          <li><img src={lindsayLogo}/></li>
          <li>Start!</li>
          <li>About</li>
          <li>Report a bug</li>
        </ul>
      </div>
    );
  }
}

export default Nav;