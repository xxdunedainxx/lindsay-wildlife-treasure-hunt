import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import QrReader from 'react-qr-reader'
import './ScanDisplay.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import expandIcon from '../../assets/expand-solid.svg';
import GameDisplay from './GameDisplay';
// https://oberhofer.co/mediastreamtrack-and-its-capabilities/
// Scan Display
// https://github.com/JodusNodus/react-qr-reader/blob/521b4ad1910ca24e0071c0502044526a282521e1/examples/legacy-mode.js
class ScanDisplay extends React.Component {

    constructor(props) {
      super(props);
      this.parent = props.parentComponent;
      console.log(this.parent)
      this.parent.scannerDisplay = this;
      this.scanDisplayControls = this.parent.scanDisplayControls;
      let scannerWidth, scannerHeight;

      let width, height;
      if(window.innerWidth < 640) {
        this.width = 350;
        this.height = 350;
      }
      else {
        this.width = 500;
        this.height = 500;
      }

      this.state = {
        availWidth: window.innerWidth,
        availHeight: window.innerHeight,
        scannerWidth: window.screen.width,
        scannerHeight: window.screen.height,
        scannerContainerStyle: {
          width: this.width,
          height: this.height
        },
        expandStyle: {
          height: 50,
          width : 50
        },
        showViewFinder: false,
        resolution: "2080",
        legacyMode: true
      }

      this.qrReaderConstraints = {
        // width: {min: 640, ideal: 1280},
        // height: {min: 480, ideal: 720},
        // cursor: "never" ,
        // advanced: [
        //   {width: 1920, height: 1280},
        //   {aspectRatio: 10},
        //   {frameRate: 50},
        //   {resizeMode: 50}
        // ]

      }
    }

    fullscreen(){
      this.setState(
        {
          scannerContainerStyle: {
            width: window.screen.width,
            height: window.screen.height
          }
        }
      );
      this.render()
    }

    exitFullscreen(){
      console.log("reducing scan display")
      this.setState(
        {
          scannerContainerStyle: {
            width: this.width,
            height: this.height
          }
        }
      );
      this.render()
    }
    
    scanDomElement(){
      this.domElement= document.getElementById("scannerDisplay");
      this.domElement.onmouseover = this.onMouseOverDomElem
      this.domElement.onmouseout = this.onMouseOutDomElem
      this.cssStyle = document.getElementById("scannerDisplay").style;
      console.log(this.domElement.getBoundingClientRect())
      console.log('setting scan display control position...');
      this.scanDisplayControls.positionControls (
        this.domElement.getBoundingClientRect().y, 
        this.domElement.getBoundingClientRect().x, 
        this.domElement.getBoundingClientRect().width
      );
    }

    componentDidMount() {
      // navigator.mediaDevices.getUserMedia({ video: true })
      // .then(mediaStream => {
      //   const track = mediaStream.getVideoTracks()[0];
      //   track.applyConstraints(this.qrReaderConstraints)
      //   .then(() => {
      //     alert('applied constraints?')
      //     // Do something with the track such as using the Image Capture API.
      //   })
      //   .catch(e => {
      //     alert(∂'failed to apply constraints?')
      //     console.log(e)
      //     // The constraints could not be satisfied by the available devices.
      //   });
      // });
      this.scanDomElement();
      window.addEventListener('resize', this.updateWindowSize.bind(this));
    }
    componentDidUpdate(){
      this.scanDomElement();
    }

    onMouseOverDomElem(){
      console.log("on mouse over?")
      GameDisplay.INSTANCE.mouseOverGameDisplay()
    }

    onMouseOutDomElem(){
      console.log("on mouse out?")
      GameDisplay.INSTANCE.mouseOutGameDisplay()
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
    handleScan = data => {
      if (data) {
        alert(data)
      }
    }

    handleError = error => {
      alert(error)
    }

    openImageDialog() {
      alert("opening?")
      this.refs.qrReader1.openImageDialog() 
    }
  
    render() {
      if(!this.props.displayAnswer && this.props.readyForBarcode && !this.props.manualEntryMode) {
        if(this.props.scannerOpen === false) {
          return(
            <div className="scanner-display-container" id="scannerDisplay">
              <ReadyToScanButton
                onClick={this.props.readyToScanButton}
                scannerOpen={this.props.scannerOpen}
              />
            </div>
          );
        } else {
          return(
            <div id="scannerDisplay" className="scanner-display-container" style={this.state.scannerContainerStyle}>
              <div className="scanner-container">   
              <QrReader 
                delay={300}
                ref="qrReader1"
                onError={this.handleError}
                onScan={this.handleScan}
                facingMode="environment"
                resolution={this.state.resolution}
                showViewFinder={this.state.showViewFinder}
                constraints={this.qrReaderConstraints}
                className="qrReaderV2"
              />
              
              </div>
              <div className="scanner-container">

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

              // <BarcodeScanner
              //   qrScannerUpdate={this.props.qrScannerUpdate}
              //   scannerWidth = {this.state.scannerWidth}
              //   scannerHeight = {this.state.scannerHeight}
              // />

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