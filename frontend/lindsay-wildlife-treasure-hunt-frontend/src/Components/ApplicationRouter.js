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
import {MobileNav} from './Nav/MobileNav';
import {WinPage} from './pages/win/WinPageComponent';

export class ApplicationRouter extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div id="appRouter">
        <Route path='/ui/home' component={HomePage} />
        <Route path='/ui/about' component={AboutPage} />
        <Route path='/ui/game' component={GamePage} />
        <Route path='/ui/report' component={ReportBugPage} />
        <Route path='/ui/mobileNav' component={MobileNav} />
        <Route path='/win' component={WinPage} />
      </div>
    );
  }
}

export default ApplicationRouter;