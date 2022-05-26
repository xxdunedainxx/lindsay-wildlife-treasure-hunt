import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import DebugLogger from "react-debug-logging-console"

import {Nav} from './Components/Nav/Nav';


import Setup from './src/util/Setup';
import Configuration from './src/conf/Configuration';
import Logger from './src/util/Logger';
import HttpArgParser from './src/util/HttpArgParser';

import {ApplicationRouter} from './Components/ApplicationRouter';

import {WallboardPage} from './Components/pages/wallboarding/WallboardPage';

function renderMainApp(){
  if(HttpArgParser.WALLBOARD == 'false'){
    return (
          <header className="App-header" >
        <Router>
          <Nav/>
          <ApplicationRouter />
          <DebugLogger enabled={HttpArgParser.DEBUG_MODE != "false"}/>
        </Router>
      </header>
    )
  } else {
    return renderWallboard()
  }
}

function renderWallboard(){
  return (
    <WallboardPage />
  )
}


function App() {
  // redirect to home
  if(window.location.pathname == '/ui/' || window.location.pathname == '/ui'){
    window.location.href = '/ui/home';
  }

  Setup.Run()
  Logger.info("START REACT APP", true)
  Logger.info(Configuration)

  return (

    <div className="App">
      {renderMainApp()}
    </div>
  );
}

export default App;
