import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export class AAANav extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        <li>
          <Link to="/ui/aaa/home">
            <div className="nav-text">
              AAA Home
            </div>
          </Link>
        </li>
     </React.Fragment>
    );
  }
}

export default AAANav;