import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

import './QRCodeScanner.css';

export class QRCodeScanner extends React.Component {
  static openBarCodeString ="+ Open Barcode Scanner"
  static closeBarCodeString="- Close barcode Scanner"
  static displayStateOpen  ="block"
  static displayStateClosed="none"

  constructor(props) {
    super(props)
    this.state = {
      displayState: QRCodeScanner.displayStateOpen,
      displayStateUI: QRCodeScanner.closeBarCodeString,
      currentChoiceDisplayState: QRCodeScanner.displayStateClosed,
      currentChoice: ''
    }
  }

  toggleDisplayState(){
    if(this.state.displayState == QRCodeScanner.displayStateOpen){
      this.setState(
        {
          displayState: QRCodeScanner.displayStateClosed,
          displayStateUI: QRCodeScanner.openBarCodeString
        }
      );
    } else {
      this.setState(
        {
          displayState: QRCodeScanner.displayStateOpen,
          displayStateUI: QRCodeScanner.closeBarCodeString
        }
      );
    }
  }

  render(){
    return (
      <div>
      <div style={{display: this.state.displayState}}>
         <h3>Current Guess:</h3>
        <div style={{display: this.state.currentChoiceDisplayState}}>
        {this.state.currentChoice}
        </div>
          <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) {
              this.setState(
                {
                  currentChoice: result.text,
                  currentChoiceDisplayState: QRCodeScanner.displayStateOpen
                }
              )
            }
            else {
              this.setState(
                {
                  currentChoice: '',
                  currentChoiceDisplayState: QRCodeScanner.displayStateClosed
                }
              )
            }
          }}
        />
      </div>
      <div>
      <button onClick={this.toggleDisplayState.bind(this)}>{this.state.displayStateUI}</button> 
      </div>
      </div>
    );
  }
}

export default QRCodeScanner;