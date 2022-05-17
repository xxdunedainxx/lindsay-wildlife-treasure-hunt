import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export class AdminNav extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        <li>
          <Link to="/ui/admin/home">
            <div className="nav-text">
              Admin Home
            </div>
          </Link>
        </li>
        <li>
          <Link to="/ui/admin/wallboards">
            <div className="nav-text">
              Wallboards
            </div>
          </Link>
        </li>
        <li>
          <Link to="/ui/admin/fileserver">
            <div className="nav-text">
              Files
            </div>
          </Link>
        </li>
     </React.Fragment>
    );
  }
}

export default AdminNav;