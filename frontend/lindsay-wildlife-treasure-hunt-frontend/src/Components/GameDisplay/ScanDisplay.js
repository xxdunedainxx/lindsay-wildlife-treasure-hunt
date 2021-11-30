import React from "react";
import ZBarcodeScanner from '../BarcodeScanner/ZBarcodeScanner';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import QrReader from 'react-qr-reader'
import GameDisplay from './GameDisplay';
// Scan Display
class ScanDisplay extends React.Component {

    static BARCODE_SCANNERS = {
      "ZBarcodeScanner" : "ZBarcodeScanner",
      "QrReader" : "QrReader",
      "BarcodeScannerComponent" : "BarcodeScannerComponent"
    }

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
        scannerOpen: props.scannerOpen,
        resolution: 600,
        barCodeScannerVersion: ScanDisplay.BARCODE_SCANNERS.ZBarcodeScanner
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
  
    barCodeScannerToggle(event) {
      this.setState(
        {
            barCodeScannerVersion: event.target.value
        }
      )
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

    __getScanner(){
      if(this.state.barCodeScannerVersion == ScanDisplay.BARCODE_SCANNERS.BarcodeScannerComponent) {
        return (
          <BarcodeScannerComponent
            width={this.state.scannerWidth}
            height={this.state.scannerHeight}
            onUpdate={(err, result) => {
                this.handleScan(result)
            }}
          />
        )
      } else if(this.state.barCodeScannerVersion == ScanDisplay.BARCODE_SCANNERS.QrReader) {
        return (
          <QrReader
            delay={500}
            showViewFinder={this.state.showViewFinder}
            onError={this.handleScanError}
            onScan={this.handleScan}
            className="qrScannerV2"
            resolution={this.state.resolution}
            style={{ width: this.state.scannerWidth, height: this.state.scannerHeight }}
          />
        )
      } else{
        return (
          <ZBarcodeScanner
            width={this.state.scannerWidth}
            height={this.state.scannerHeight}
            onSuccessScan={this.handleScan}
            scanEnabled={this.props.scannerOpen}
          />
        )
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
              {this.__getScanner()} 
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
              Bar code scanner toggle
              <select onChange={this.barCodeScannerToggle.bind(this)}>
                <option selected name={ScanDisplay.BARCODE_SCANNERS.ZBarcodeScanner} value={ScanDisplay.BARCODE_SCANNERS.ZBarcodeScanner}>{ScanDisplay.BARCODE_SCANNERS.ZBarcodeScanner}</option>
                <option name={ScanDisplay.BARCODE_SCANNERS.BarcodeScannerComponent} value={ScanDisplay.BARCODE_SCANNERS.BarcodeScannerComponent}>{ScanDisplay.BARCODE_SCANNERS.BarcodeScannerComponent}</option>
                <option name={ScanDisplay.BARCODE_SCANNERS.QrReader} value={ScanDisplay.BARCODE_SCANNERS.QrReader}>{ScanDisplay.BARCODE_SCANNERS.QrReader}</option>
              </select>
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