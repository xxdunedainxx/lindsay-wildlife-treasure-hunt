import logo from './logo.svg';
import './App.css';
import './assets/css/nav.css';

import {Nav} from './Components/Nav/Nav';
import {PageBody} from './Components/PageBody/PageBody';

import Setup from './src/util/Setup';
import Configuration from './src/conf/Configuration';
import Logger from './src/util/Logger';
import HttpClient from './src/http/HttpClient';

function App() {
  Setup.Run()
  Logger.info("START REACT APP")
  Logger.info(Configuration)
  var headers = Configuration.headers
  return (

    <div className="App">
      <header className="App-header" >
        <Nav headers={headers}/>
        <PageBody />
      </header>
    </div>
  );
}

export default App;
