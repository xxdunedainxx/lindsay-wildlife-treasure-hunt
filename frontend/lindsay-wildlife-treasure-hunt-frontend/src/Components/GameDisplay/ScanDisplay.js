import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

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
        scannerWidth: width,
        scannerHeight: height,
      }
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateWindowSize.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowSize.bind(this));
    }

    updateWindowSize() {
      let width, height;
      if(window.innerWidth < 640) {
        width = 350;
        height = 350;
      }
      else {
        width = 500;
        height = 500;
      }
      this.setState({
        scannerWidth: width,
        scannerHeight: height,
      })
    }
  
    render() {
      if(!this.props.displayAnswer && this.props.readyForBarcode && !this.props.manualEntryMode) {
        if(this.props.scannerOpen === false) {
          return(
            <div className="scanner-container">
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
              <BarcodeScanner
                qrScannerUpdate={this.props.qrScannerUpdate}
                scannerWidth = {this.state.scannerWidth}
                scannerHeight = {this.state.scannerHeight}
              />
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