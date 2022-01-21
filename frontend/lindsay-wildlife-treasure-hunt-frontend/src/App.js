import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import {Nav} from './Components/Nav/Nav';


import Setup from './src/util/Setup';
import Configuration from './src/conf/Configuration';
import Logger from './src/util/Logger';
import TestClient from './src/http/clients/TestClient';
import AppHealthClient from './src/http/clients/AppHealthClient';
import GameControllerClient from './src/http/clients/GameControllerClient';


import {ApplicationRouter} from './Components/ApplicationRouter';

import {AboutPage} from './Components/pages/about/AboutPageComponent';
import {GamePage} from './Components/pages/game/GamePageComponent';
import {HomePage} from './Components/pages/home/HomePageComponent';
import {ReportBugPage} from './Components/pages/report/ReportBugPageComponent';

function App() {
  // redirect to home
  if(window.location.pathname == '/ui/' || window.location.pathname == '/ui'){
    window.location.href = '/ui/home';
  }

  Setup.Run()
  Logger.info("START REACT APP", true)
  Logger.info(Configuration)
  var headers = Configuration.headers
  // var appHealthClient = new AppHealthClient(Configuration.healthEndpoint)
  // appHealthClient.health()
  // appHealthClient.dependencies()


  return (

    <div className="App">
      <header className="App-header" >
        <Router>
          <Nav headers={headers}/>
          <ApplicationRouter />
        </Router>
      </header>
    </div>
  );
}

export default App;
