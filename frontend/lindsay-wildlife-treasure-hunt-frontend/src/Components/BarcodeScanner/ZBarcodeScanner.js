import React from 'react';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
//https://www.npmjs.com/package/qrcode-reader
import { BrowserMultiFormatReader, BrowserQRCodeReader, Result, BarcodeFormat, DecodeHintType } from '@zxing/library'
import Webcam from 'react-webcam'
import QrCode from 'qrcode-reader';
import './ZBarcodeScanner.css';
class ZBarcodeScanner extends React.Component {

 constructor(props) {
    super(props)
    console.log("start zbarcode scanner")
    this.qr_reader = new QrCode()
    this.qr_reader.callback = function(error, result) {
      if(error) {
        return;
      }
      console.log(result)
      alert(`Found ${result}`)
    }
    this.__setupClassVariables(props)
    this.__setupScanCallBacks(props)
    this.__setupCodeReader()
    this.videoStyle= {
      visibility: "hidden"
    }
    this.state = {
      videoElementID: this.videoElementID,
      containerElementID: this.containerElementID,
      width: 750,
      scanEnabled: false,
      height: 750,
      videoConstraints : {
        width: 1280,
        height: 720,
        facingMode: "environment"
      },
      zoom: 2.5,
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
    this.codeBootstrapper = new BrowserQRCodeReader(hints)
  }

  defaultOnSuccessScan(result){ console.log(result); alert(result) }
  defaultOnErrorScan(error){} // default no-op

  setupCanvas(){
    var canvas = document.getElementById('qrcodecanvas');
    var ctx    = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    var video  = document.getElementById(this.videoElementID);
    video = this.codeReader.prepareVideoElement(video)
    video.setAttribute('autoplay', 'true');
    video.setAttribute('muted', 'true');
    video.setAttribute('playsinline', 'true');
    var img = document.getElementById('barcodeimgElement')
    console.log(canvas)
    console.log(ctx)
    var self = this
    setTimeout(this.decodeImage, 1000/5)
    video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            console.log("video loop")
            if (!$this.paused && !$this.ended) {
                ctx.setTransform(1,0,0,1,0,0);
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.scale(self.state.zoom, self.state.zoom);
                ctx.drawImage($this,0,0);

                // 200, 200,// adjusts location to focus on
                //   50, 50, // adjust 'zoom'
                //   0, 0,
                //   750, 750
                // );
                var pngUrl = canvas.toDataURL();
                var img = document.getElementById('barcodeimgElement')
                img.src = pngUrl
                self.decodeImage(pngUrl)
                console.log("back in play listener?")
                setTimeout(loop, 1000 / 120); // drawing at 30fps
                // alert('draw')
            }
        })();
    }, 0); 
  }

  decodeImage(data){
    if(this.qr_reader != undefined){
      console.log("decoding??????")
      console.log(this.codeReader)
      let result = this.qr_reader.decode(data);
      console.log(result)
    }
    // if(this.codeReader != undefined){
    // var barcode = document.getElementById("barcodeimgElement")
    // var prepedElem = this.codeReader.prepareImageElement(barcode)
    // // var bitMap = this.codeReader.createBinaryBitmap(ctx)
    // // console.log(bitMap)
    // this.codeReader.decodeFromImageElement(prepedElem,
    //   (result, err) => { 
    //  // do something with the result in here  
    //   if(result) {
    //     this.onSuccessScan(result)
    //   }

    //   if(err) {
    //     var canvas = document.getElementById('qrcodecanvas');
    //     var ctx    = canvas.getContext('2d');
    //     var video  = document.getElementById(this.videoElementID);
    //     console.log("error...")
    //     ctx.drawImage(video, 0, 0);
    //     var pngUrl = canvas.toDataURL();
    //     var barcodeelement = document.getElementById("barcodeimgElement")
    //     barcodeelement.src=pngUrl
    //     this.decodeImage()
    //     console.log("back in play listener?")
    //     this.onErrorScan(err)
    //   }
    // }).catch(err => console.log(err))
    //   console.log("returning?") 
    // } else{
    //   console.log("codereader not ready yet")
    // }
  } 

  // after the component is mounted, grab the device ID 
  componentDidMount(){
    console.log("getting video info...")
    const hdConstraints = {
      video: { width: { min: 1280 }, height: { min: 720 }, facingMode: { exact: "environment" }},
    };
    let video = document.getElementById(this.videoElementID)
    navigator.mediaDevices.getUserMedia(hdConstraints).then((stream) => {
        video.srcObject = stream;
    });
    var self = this
    var slider = document.getElementById("myRange");
    this.__setupContinualScan()
    this.setupCanvas()
  }

  updateZoomValue(event){
      var nZoomValue = event.target.value
      console.log("update zoom value")
      console.log(nZoomValue)
      this.setState(
      {
        zoom: nZoomValue
      }
      )
      // console.log(this.state)
  }

  componentWillUnmount(){
    console.log("unloading barcode scanner")
    this.codeReader.stopContinuousDecode()
  }

  __setupContinualScan(){
    this.codeBootstrapper.decodeFromVideoDevice(undefined, this.state.videoElementID, (result, err) => { 
    /* do something with the result in here */ 
      // if(result) {
      //   this.onSuccessScan(result)
      // }

      // if(err) {
      //   this.onErrorScan(err)
      // }
    })
    console.log("setting up scanner loop")
    // const loop = () => {
    //   try {
    //     var barcode = document.getElementById("barcodeimgElement")
    //     if(barcode != undefined && barcode.src != ''){
    //       this.codeReader.decodeFromImage("barcodeimgElement",(result, err) => { 
    //        do something with the result in here  
    //         if(result) {
    //           this.onSuccessScan(result)
    //         }

    //         if(err) {
    //           this.onErrorScan(err)
    //         }
    //       })
    //     } 
    //   } catch {
        
    //   }

    //   setTimeout(loop, 5000)
    // }

    // loop()
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
            <img id="barcodeimgElement" style={this.videoStyle} />
            <canvas id="qrcodecanvas"
                width={this.state.width} 
                height={this.state.height}
                
            >
          </canvas>
        <div class="slidecontainer">
          <input type="range" min="0" max="10" value={this.state.zoom} step=".1" class="slider" id="myRange" onInput={this.updateZoomValue.bind(this)} />
        </div>
        <video 
          id={this.state.videoElementID} 
          width={this.state.width}
          height={this.state.height}
          muted="true"
          style={this.videoStyle}
        >
        </video>
      </div>
    );
  }
}

export default ZBarcodeScanner;