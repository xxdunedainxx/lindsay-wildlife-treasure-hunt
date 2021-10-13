import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

// Scan Display
class ScanDisplay extends React.Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      if(!this.props.displayAnswer && this.props.readyForBarcode) {
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
            <div className="scanner-container">
              <BarcodeScanner
                qrScannerUpdate={this.props.qrScannerUpdate}
              />
              <br/>
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