import logo from './logo.svg';
import './App.css';
import './assets/css/nav.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Nav} from './Components/Nav/Nav';

import Setup from './src/util/Setup';
import Configuration from './src/conf/Configuration';
import Logger from './src/util/Logger';
import TestClient from './src/http/clients/TestClient';
import AppHealthClient from './src/http/clients/AppHealthClient';

import {ApplicationRouter} from './Components/ApplicationRouter';

import {AboutPage} from './Components/pages/about/AboutPageComponent';
import {GamePage} from './Components/pages/game/GamePageComponent';
import {HomePage} from './Components/pages/home/HomePageComponent';
import {ReportBugPage} from './Components/pages/report/ReportBugPageComponent';

function App() {
  Setup.Run()
  Logger.info("START REACT APP")
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
