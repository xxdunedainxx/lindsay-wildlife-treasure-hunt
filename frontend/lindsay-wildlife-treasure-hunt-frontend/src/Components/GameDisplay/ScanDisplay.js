import React from "react";
import ZBarcodeScanner from '../BarcodeScanner/ZBarcodeScanner';
import GameDisplay from './GameDisplay';
import HttpArgParser from '../../src/util/HttpArgParser';
import Logger from '../../src/util/Logger';
// Scan Display
class ScanDisplay extends React.Component {

    constructor(props) {
      super(props);

      let scannerWidth, scannerHeight;

      let width, height;
      if(window.innerWidth < 640) {
        width = 350;
        height = 350;
      }
      else {
        width = 500;
        height = 350;
      }

      this.state = {
        availWidth: window.innerWidth,
        availHeight: window.innerHeight,
        scannerWidth: width,
        scannerHeight: height,
        showViewFinder: true,
        scannerOpen: props.scannerOpen,
        resolution: 600
      }
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateWindowSize.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowSize.bind(this));
    }

    updateWindowSize() {
      this.setState({
        availWidth: window.innerWidth,
        availHeight: window.innerHeight
      })
    }

    handleScanError(error){
      alert('something went wrong scanner..')
      alert(error)
    }

    handleScan(data) {
      Logger.info(`Data for hadleScan: ${data}`)
      if (data) {
        Logger.info("Running QR Scanner Update")
        GameDisplay.instance.qrScannerUpdate(data)
      }
    }

    __getScanner(){
        return (
          <ZBarcodeScanner
            className="ZScanner"
            width={this.state.scannerWidth}
            height={this.state.scannerHeight}
            onSuccessScan={this.handleScan}
            scanEnabled={this.props.scannerOpen}
          />
        )
    }

    __getLoadingMessage(){
      if(this.state.loadingScanResult){
        return(
          <div>
            Loading...
          </div>
        )
      } else {
        return('')
      }
    }

    __getDebugComponents(){
      if(HttpArgParser.DEBUG_MODE == "true") {
        return (
          <div>
            <DebugCorrectAnswerButton
              onClick={this.props.debugCorrectAnswerButton}
            />
            <DebugWrongAnswerButton
              onClick={this.props.debugWrongAnswerButton}
            />
            <DebugWinPage />
          </div>
        )
      } else {
        return ("");
      }
    }

    render() {
      if(!this.props.displayAnswer && this.props.readyForBarcode && !this.props.manualEntryMode) {
        if(this.props.scannerOpen === false) {
          return(
            <div className="scanner-display-container">
              <ReadyToScanButton
                onClick={this.props.readyToScanButton}
                scannerOpen={this.props.scannerOpen}
              />
            </div>
          );
        } else {
          return(
            <div className="scanner-display-container">
              <div className="scanner-container">
              <br />
              {this.__getScanner()} 
              </div>
              <ReadyToScanButton
                onClick={this.props.readyToScanButton}
                scannerOpen={this.props.scannerOpen}
              /><br/>
              {this.__getDebugComponents()}
            </div>
          );
        }
        
      }
      return(
          null
      );
    }
}
  
// Scan Display Components
function ReadyToScanButton(props) {
  const buttonDisplay = props.scannerOpen ? "Close Scanner" : "Open Scanner";
  return(
      <button
        className="game-button open-scanner-button"
        onClick={props.onClick}
      >
      {buttonDisplay}
      </button>
  );
}

function DebugCorrectAnswerButton(props) {
  return(
      <button
      onClick={props.onClick}
      >
      Correct Answer
      </button>
  );
}

function DebugWrongAnswerButton(props) {
  return(
      <button
      onClick={props.onClick}
      >
      Wrong Answer
      </button>
  );
}

class DebugWinPage extends React.Component {

    constructor(props) {
      super(props);
    }
    render() {
        return(
        <div>
          <button
          onClick={this.redirectToWinPage}
          >
          Redirect to win page
          </button>
        </div>
      );
    }

    redirectToWinPage(){
      window.location.href = '/ui/win?debug=true';
    }
};

export default ScanDisplay;