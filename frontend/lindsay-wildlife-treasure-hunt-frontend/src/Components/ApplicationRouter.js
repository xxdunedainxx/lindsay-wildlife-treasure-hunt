import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {AboutPage} from './pages/about/AboutPageComponent';
import {GamePage} from './pages/game/GamePageComponent';
import {HomePage} from './pages/home/HomePageComponent';
import {ReportBugPage} from './pages/report/ReportBugPageComponent';

export class ApplicationRouter extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
        <Route path='/home' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/game' component={GamePage} />
        <Route path='/report' component={ReportBugPage} />
      </div>
    );
  }
}

export default ApplicationRouter;