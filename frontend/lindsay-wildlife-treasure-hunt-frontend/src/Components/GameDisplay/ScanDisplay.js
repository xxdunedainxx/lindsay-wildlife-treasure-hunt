import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import QrReader from 'react-qr-reader'
import GameDisplay from './GameDisplay';
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
        height = 500;
      }

      this.state = {
        availWidth: window.innerWidth,
        availHeight: window.innerHeight,
        scannerWidth: width,
        scannerHeight: height,
        showViewFinder: true,
        resolution: 600,
        barCodeScannerVersion: 'react-webcam-barcode-scanner'
      }
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateWindowSize.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowSize.bind(this));
    }

    updateWindowSize() {
      console.log("WINDOW: " + window.innerWidth + ", " + window.innerHeight)
      this.setState({
        availWidth: window.innerWidth,
        availHeight: window.innerHeight
      })
    }
  
    barCodeScannerToggle() {
      if(this.state.barCodeScannerVersion == 'react-webcam-barcode-scanner') {
        this.setState(
          {
            barCodeScannerVersion: 'react-qr-reader'
          }
        );
      } else {
        this.setState(
          {
            barCodeScannerVersion: 'react-webcam-barcode-scanner'
          }
        );
      }
    }

    handleScanError(error){
      alert('something went wrong scanner..')
      alert(error)
    }

    handleScan = data => {
      if (data) {
        GameDisplay.instance.qrScannerUpdate(data)
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
              Current Barcode Scanner: <b>{this.state.barCodeScannerVersion}</b><br/>
              {
                this.state.barCodeScannerVersion == 'react-webcam-barcode-scanner' ? 
                <BarcodeScannerComponent
                  width={this.state.scannerWidth}
                  height={this.state.scannerHeight}
                  onUpdate={(err, result) => {
                      this.handleScan(result)
                  }}
                />
                :
                <QrReader
                  delay={500}
                  showViewFinder={this.state.showViewFinder}
                  onError={this.handleScanError}
                  onScan={this.handleScan}
                  className="qrScannerV2"
                  resolution={this.state.resolution}
                  style={{ width: this.state.scannerWidth, height: this.state.scannerHeight }}
                />
              } 
              </div>
              <ReadyToScanButton
                onClick={this.props.readyToScanButton}
                scannerOpen={this.props.scannerOpen}
              /><br/>
              <DebugCorrectAnswerButton
                onClick={this.props.debugCorrectAnswerButton}
              />
              <DebugWrongAnswerButton
                onClick={this.props.debugWrongAnswerButton}
              />
              <button onClick={this.barCodeScannerToggle.bind(this)} >Bar code scanner toggle</button>
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

function BarcodeScanner(props) {
  return(
      <BarcodeScannerComponent
        width={props.scannerWidth}
        height={props.scannerHeight}
        onUpdate={(err, result) => {
            props.qrScannerUpdate.qrScannerUpdate(result)
        }}
      />
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

export default ScanDisplay;