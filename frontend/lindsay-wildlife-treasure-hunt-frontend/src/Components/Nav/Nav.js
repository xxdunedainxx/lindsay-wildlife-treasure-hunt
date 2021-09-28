import React from 'react';
import './Nav.css';

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
          <li>Lindsay Logo here</li>
          <li>Start!</li>
          <li>About</li>
          <li>Report a bug</li>
        </ul>
      </div>
    );
  }
}

export default Nav;