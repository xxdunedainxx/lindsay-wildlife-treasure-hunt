import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

// Scan Display
class ScanDisplay extends React.Component {

    constructor(props) {
      super(props);

      let scannerWidth, scannerHeight;

      this.state = {
        availWidth: window.innerWidth,
        availHeight: window.innerHeight,
        scannerWidth: 500,
        scannerHeight: 500,
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
      if(this.state.availWidth < 640) {

      }
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
              />
              </div>
              <ReadyToScanButton
                onClick={this.props.readyToScanButton}
                scannerOpen={this.props.scannerOpen}
              />
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
  const buttonDisplay = props.scannerOpen ? "Close scanner" : "Open scanner";
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
        width={500}
        height={500}
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