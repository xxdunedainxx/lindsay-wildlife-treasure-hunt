import React from 'react';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { BrowserMultiFormatReader, BrowserQRCodeReader, Result, BarcodeFormat, DecodeHintType } from '@zxing/library'
import Webcam from 'react-webcam'

class ZBarcodeScanner extends React.Component {

 constructor(props) {
    super(props)
    console.log("start zbarcode scanner")
    this.__setupClassVariables(props)
    this.__setupScanCallBacks(props)
    this.__setupCodeReader()

    this.state = {
      videoElementID: this.videoElementID,
      containerElementID: this.containerElementID,
      width: this.width,
      scanEnabled: false,
      height: this.height,
      videoConstraints : {
        width: 1280,
        height: 720,
        facingMode: "environment"
      }
    }
    console.log(this.props)
  }

  __setupClassVariables(props) {
    this.containerElementID = props.containerElementID != undefined ? props.videoElementID : 'zbarcodeScannerContainer'
    this.videoElementID = props.videoElementID != undefined ? props.videoElementID : 'zvideo'
    this.height = props.height != undefined ? props.height : 500
    this.width = props.width != undefined ? props.width : 500
  }

  __setupScanCallBacks(props) {
    if(props.onSuccessScan != undefined) {
      this.onSuccessScan = props.onSuccessScan
    } else { 
      this.onSuccessScan = this.defaultOnSuccessScan
    }

    if(props.onErrorScan != undefined) {
      this.onErrorScan = props.onErrorScan
    } else {
      this.onErrorScan = this.defaultOnErrorScan
    }
  }

  __setupCodeReader(){
    const hints = new Map();
    const formats = [BarcodeFormat.CODE_128, BarcodeFormat.EAN_8, BarcodeFormat.EAN_13, BarcodeFormat.QR_CODE];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    hints.set(DecodeHintType.TRY_HARDER, true);


    this.codeReader = new BrowserQRCodeReader(hints)
  }

  defaultOnSuccessScan(result){ console.log(result); alert(result) }
  defaultOnErrorScan(error){} // default no-op


  // after the component is mounted, grab the device ID 
  componentDidMount(){
    console.log("getting video info...")
    this.__setupContinualScan()
  }

  componentWillUnmount(){
    console.log("unloading barcode scanner")
    this.codeReader.stopContinuousDecode()
  }

  __setupContinualScan(){
    this.codeReader.decodeFromVideoDevice(undefined, this.state.videoElementID, (result, err) => { 
    /* do something with the result in here */ 
      if(result) {
        this.onSuccessScan(result)
      }

      if(err) {
        this.onErrorScan(err)
      }
    })
  }

  /**
    *  @deprecated - utilizing video element ID specified by caller
  */
  async getVideoDeviceID(){
    let ids = await this.codeReader.listVideoInputDevices()
    console.log("IDs:")
    console.log(ids)
    this.codeReader.getVideoInputDevices().then((videoInputDevices) => {
      this.videoRef = videoInputDevices[0].deviceId
      console.log("device id:")
      console.log(this.videoRef)
      this.codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, 'zvideo', (result, err) => { 
      /* do something with the result in here */ 
        if(result) {
          console.log("got a result?")
          this.onSuccessScan(result)
        }

        if(err) {
          this.onErrorScan(err)
        }
      })

    })
  }

  render() {
    return (
      <div id={this.state.containerElementID}>
        <video 
          id={this.state.videoElementID} 
          width={this.state.width} 
          height={this.state.height} 
          muted="true"
        >
        </video>
      </div>
    );
  }
}

export default ZBarcodeScanner;
