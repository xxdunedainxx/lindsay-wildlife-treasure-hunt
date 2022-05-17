import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AdminHome from './components/AdminHome/AdminHome';
import LoginForm from './components/LoginForm/LoginForm';
import WallboardManagement from './components/WallboardManagement/WallboardManagement';
import FileServer from './components/FileServer/FileServer';

export class AdminRouter extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div id="appRouter">
        <Route path='/ui/admin/home' component={AdminHome} />
        <Route path='/ui/admin/login' component={LoginForm} />
        <Route path='/ui/admin/wallboards' component={WallboardManagement} />
        <Route path='/ui/admin/fileserver' component={FileServer} />
      </div>
    );
  }
}

export default AdminRouter;