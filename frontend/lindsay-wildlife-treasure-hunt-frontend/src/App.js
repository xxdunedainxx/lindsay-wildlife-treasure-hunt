import logo from './logo.svg';
import './App.css';
import './assets/css/nav.css';
import {Nav} from './Components/Nav/Nav';
import {PageBody} from './Components/PageBody/PageBody';
import {QRCodeScanner} from './Components/qrcodescanner/QRCodeScanner';

import Setup from './src/util/Setup';
import Configuration from './src/conf/Configuration';
import Logger from './src/util/Logger';
import TestClient from './src/http/clients/TestClient';
import AppHealthClient from './src/http/clients/AppHealthClient';
import GameControllerClient from './src/http/clients/GameControllerClient';

function App() {
  Setup.Run()
  Logger.info("START REACT APP")
  Logger.info(Configuration)
  var headers = Configuration.headers
  // var appHealthClient = new AppHealthClient(Configuration.healthEndpoint)
  // appHealthClient.health()
  // appHealthClient.dependencies()
  var gameControllerClient = new GameControllerClient(Configuration.remoteEndpoint)
  gameControllerClient.getDb()
  return (

    <div className="App">
      <header className="App-header" >
        <Nav headers={headers}/>
        <PageBody />
        <QRCodeScanner />
      </header>
    </div>
  );
}

export default App;
