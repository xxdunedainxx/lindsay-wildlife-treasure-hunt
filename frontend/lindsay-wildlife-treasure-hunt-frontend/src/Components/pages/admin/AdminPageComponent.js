import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './AdminPageComponent.css';

import Configuration from '../../../src/conf/Configuration';
import LoginForm from './src/components/LoginForm/LoginForm';
import HttpPreflightAuthCheck from './src/http/HttpPreflightAuthCheck';
import AdminRouter from './src/AdminRouter';

export class AdminPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="admin-page-container">
       <h1>Admin Page</h1>
        <AdminRouter/>
      </div>
    );
  }

  componentDidMount(){

    if(window.location.pathname != '/ui/admin/login'){

      var check = new HttpPreflightAuthCheck(
        `${Configuration.remoteEndpoint}`
      );

      check.check();
    }
  }
}


export default AdminPage;