import React from 'react';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { BrowserMultiFormatReader, BrowserQRCodeReader, Result, BarcodeFormat, DecodeHintType } from '@zxing/library'
import './ZBarcodeScanner.css';

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
      },
      loadingScanResult: false,
      videoOverrideStyle: undefined,
      zvideoContainerStyle: {

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
    this.__scanEnabled()
  }

  componentWillUnmount(){
    console.log("unloading barcode scanner")
    this.codeReader.stopContinuousDecode()
    this.__scanDisabled()
  }

  __videoOpacity(){
    if(this.state.videoOverrideStyle == undefined){
      this.setState(
      {
        videoOverrideStyle: {
          filter: "opacity(30%)"
        }
      }
      )
    }
  }

  __undoVideoOpacity(){
    if(this.state.videoOverrideStyle != undefined){
     this.setState(
        {
          videoOverrideStyle: undefined
        }
      )
    }
  }

  __getLoadingResultUI(){
    if(this.state.loadingScanResult == true){
      this.__videoOpacity()
      return (
        <div id="zscannerProcessingText">
          Processing...
        </div>
      )
    } else {
      this.__undoVideoOpacity()
      return ('')
    }
  }

  __processingScanResult(){
    return this.state.loadingScanResult
  }

  __processingScanResult(){
    this.setState({
      loadingScanResult: true
    })
  }

  __doneProcessingScanResult(){
    this.setState({
      loadingScanResult: false
    })
  }

  __successScanWrapper(result){
    this.__processingScanResult()
    setTimeout(() => {
      this.onSuccessScan(result)
      this.__doneProcessingScanResult()
    }, 1000);
  }

  __scanEnabled(){
    this.setState(
      {
        scanEnabled: true
      }
    )
  }

  __scanDisabled(){
    this.setState(
      {
        scanEnabled: false
      }
    )
  }

  isScanEnabled(){
    return this.state.scanEnabled
  }

  __setupContinualScan(){
    this.codeReader.decodeFromVideoDevice(undefined, this.state.videoElementID, (result, err) => { 
    /* do something with the result in here */ 
      if(this.isScanEnabled()){

        if(result) {
          this.__scanDisabled()
          this.__successScanWrapper(result)
        }

        if(err) {
          this.onErrorScan(err)
        }
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
      <div id={this.state.containerElementID} class="zVideoBarcodeScanner">
        {this.__getLoadingResultUI()}
        <video 
          id={this.state.videoElementID} 
          width={this.state.width} 
          height={this.state.height} 
          muted="true"
          style={this.state.videoOverrideStyle}
        >
        </video>
      </div>
    );
  }
}

export default ZBarcodeScanner;