import React from 'react';

//https://www.npmjs.com/package/qrcode-reader
//import Webcam from 'react-webcam'
//https://www.npmjs.com/package/jsqr
import jsQR from "jsqr";
import QrCode from 'qrcode-reader';
import './ZBarcodeScanner.css';
import HttpArgParser from '../../src/util/HttpArgParser';

import playbutton from './play_button.svg';
import pausebutton from './pause_button.svg';

import Logger from '../../src/util/Logger';

export class ZBarcodeScanner extends React.Component {

 constructor(props) {
    super(props)
    console.log("start zbarcode scanner")
    this.qr_reader = new QrCode()
    this.__setupClassVariables(props)
    this.__setupScanCallBacks(props)

    this.videoPaused = false

    this.sliderStyle = {
      width: "75%",
      height: "50px",
      border_radius: "5px"  
    }

    this.qrParentStyle = {
      margin: "auto"
      // width: "75%",
      // height: "500px"
    }

    // 4:3 aspect ratio
    if(this.isSmallAppleDevice() == false){
      var widthToUse = window.innerWidth * .95 // 95% of window width
    } else {
      var widthToUse = window.screen.width * .95 // 95% of window width
    }
    let heightToUse = (widthToUse * .75)

    this.videoStyle = {
      visibility: "hidden",
      display: "none",
      width: widthToUse,
      height: heightToUse
    }

    this.canvasHealthThreshold = 60
    this.canvasRequiredSuccessChecks = 5

    this.state = {
      mounted: true,
      videoElementID: this.videoElementID,
      containerElementID: this.containerElementID,
      width: widthToUse,
      scanEnabled: false,
      optimizedZoomSupported: false,
      canvasState : {
        previousCanvasUrl: '',
        duplicateCanvasDetected: 0,
        successfulChecks       : 0,
        healthy: false
      },
      height: heightToUse,
      videoConstraints : {
        width: widthToUse,
        height: heightToUse,
        facingMode: "environment",
        zoom: true
      },
      zoom: 1.0,
      zoomFloor: 1.0,
      zoomCeiling: 10.0,
      qrParentStyle: {
        // ensure to maintain a 4:3 aspect ratio when scaling
        width: widthToUse,
        height: heightToUse,
        margin: "auto"
      },
      qrCanvasStyle: {
        display: "",
        visibility: ""
      },
      scrollerStyle: {
        width: (widthToUse * .75),
        margin: "auto"
      },
      videoRendering: false
    }

    // if(window.innerWidth < 640) {
    //   console.log("override ZBarCodeScanner width and height!")
    //   this.state.qrParentStyle = {
    //     width: 400,
    //     height: 300,
    //     margin: "auto"
    //   }
    //   this.state.scrollerStyle = {
    //     width: 300,
    //     margin: "auto"
    //   }
    //   console.log(this.state)
    // }

    console.log(this.props)
  }

  isSmallAppleDevice(){
    return (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod" )
  }

  isSafari(){
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    return isSafari
  }

  __compononentDidMount(){
    this.mounted = true
  }

  __componentDidUnMount(){
    this.mounted = false
  }

  __isMounted(){
    return this.mounted
  }

  __canvasIsHealthy(){
    return this.state.canvasState.healthy
  }

  __canvasHealthCheck(canvas) {


    if(this.canvasElement.toDataURL() == this.state.canvasState.previousCanvasUrl) {
      this.setState({
        canvasState: {
          healthy: false,
          duplicateCanvasDetected: (this.state.canvasState.duplicateCanvasDetected + 1),
          previousCanvasUrl: this.canvasElement.toDataURL(),
          successfulChecks: this.state.canvasState.successfulChecks
        }
      })
    } else {
      var canvasIsHealthy = false
      if(this.state.canvasState.successfulChecks > this.canvasRequiredSuccessChecks) {
        canvasIsHealthy = true
      }
      this.setState({
        canvasState: {
          healthy: canvasIsHealthy,
          duplicateCanvasDetected: 0,
          successfulChecks: (this.state.canvasState.successfulChecks + 1), 
          previousCanvasUrl: this.canvasElement.toDataURL()
        }
      })
    }
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

    var self = this
    this.qr_reader.callback = function(error, result) {
      if(error) {
        // console.log(error)
        self.onErrorScan(error)
      } else {
        console.log(result)
        self.onSuccessScan(result)
      }
    }
  }

  __getDebugImage(){
    const imgStyle = {
      margin: "auto"
    }
    if(HttpArgParser.DEBUG_MODE == "true"){

      var pixelRatio = window.devicePixelRatio
      var supportedConstraints = (navigator.mediaDevices.getSupportedConstraints())
      var zoomSupport = supportedConstraints.zoom ? supportedConstraints.zoom.toString() : 'false' 
      var facingSupport = supportedConstraints.facingMode ? supportedConstraints.facingMode.toString() : 'false'
      var focusMode = supportedConstraints.focusMode ? supportedConstraints.focusMode.toString() : 'false'
      var isItSafari = this.isSafari()
      var isItSmallAppleDevice = (this.isSmallAppleDevice())
      var innerWidth = window.innerWidth
      var outerWidth = window.outerWidth
      var navPlatform = navigator.platform
      return (<div>
        <h3>Device Pixel Ratio: {pixelRatio}</h3>
        <div>
        Supported constraints: 
          <ul >
            <li> Zoom: {zoomSupport}</li>
            <li> Facing Mode: {facingSupport}</li>
            <li> Focus Mode: {focusMode}</li>
          </ul>
          </div>
        <div>
          Optimized Zoom Support: {this.state.optimizedZoomSupported.toString()}
          <br />
          Safari?: {isItSafari.toString()}
          <br />
          Ipad/Iphone? {isItSmallAppleDevice.toString()}
          <br /> 
          Inner Width: {innerWidth}
          <br />
          Outer Width : {outerWidth}
          <br />
          Nav Platform: {navPlatform}
        </div>
        <br />
        <h3>Debug Image:</h3>
        <img id="barcodeimgElement" style={imgStyle}/>
        </div>
      )
    } else{
      return ("")
    }
  }

  defaultOnSuccessScan(result){ console.log(result); alert(result) }
  defaultOnErrorScan(error){} // default no-op

  supportsOptimizedZoom(){
    return this.state.optimizedZoomSupport
  }

  optimizedZoomSupport(){

    if (!('zoom' in this.videoElementSettings)) {
      this.setState(
        {
          optimizedZoomSupported : false
        }
      )
    } else{
      this.setState(
        {
          optimizedZoomSupported : true
        }
      )
    }
  }

  videoIsRendering(){
    this.setState(
      {
        videoRendering: true,
        qrCanvasStyle: {
          visibility: "",
          display: ""
        }
      }
    )
  }

  videoNotRendering(){
    this.setState(
      {
        videoRendering: false,
        qrCanvasStyle: {
          visibility: "hidden",
          display: "none"
        }
      }
    )
  }

  async drawCanvasAndDecodeConinuously(){
    // Cache reference to this object
    var self = this
    function loop() {
      if(self.__isMounted()){
        if (self.videoElement != undefined && !self.videoElement.paused && !self.videoElement.ended) {
            self.videoIsRendering()
            self.canvasContext.setTransform(1,0,0,1,0,0);
            self.canvasContext.clearRect(0,0,self.canvasElement.width,self.canvasElement.height);
            // if no zoom is applied, provide the default video feed
            // if optimized zoom, DO NOT scale the canvas
            if(!self.state.optimizedZoomSupported && self.state.zoom != self.state.zoomFloor){

              self.canvasContext.scale(self.state.zoom, self.state.zoom);
            }
            if(!self.state.optimizedZoomSupported && !self.isSafari()){
              self.canvasContext.drawImage(
                self.videoElement, // src image
                0, 0, // sx, sy
                self.canvasElement.width,self.canvasElement.height, // swidth, sheight
                0,0, // dx, dy
                self.canvasElement.width,self.canvasElement.height // dwidth, dheight
              );
            } else {
              self.canvasContext.drawImage(
                self.videoElement, 0,0
              );
            }

            var pngUrl = self.canvasElement.toDataURL();
            var pixelData = self.canvasContext.getImageData(0,0,self.canvasElement.width,self.canvasElement.height)

            var img = document.getElementById('barcodeimgElement')
            if(img != undefined) {
              img.src = pngUrl
            }
            self.decodeImage(pixelData.data)
            if(self.__canvasIsHealthy() == false){
              self.__canvasHealthCheck()
            }
        } else {
          self.canvasContext.setTransform(1,0,0,1,0,0);
          self.canvasContext.clearRect(0,0,self.canvasElement.width,self.canvasElement.height);
          self.videoNotRendering()
          if(self.videoElement != undefined && !self.videoPaused){
            self.playVideo()
          }
        }
        window.requestAnimationFrame(loop)
      }
      //setTimeout(loop, 1000 / 120); // drawing at 30fps
    }
    loop()
  }

  __altText(){
    if(this.state.videoRendering){
      if(this.state.canvasState.duplicateCanvasDetected > this.canvasHealthThreshold) {
        return (
          <h3>Video Rendering issue. Please try closing and opening your browser. If this does not fix your issue you can use the 'manual entry mode'</h3>
        )
      } else if(this.state.canvasState.duplicateCanvasDetected > 2 || this.state.canvasState.successfulChecks < this.canvasRequiredSuccessChecks) {
        return (
          <h3>Attempting to load video feed...</h3>
        )
      }
      else {
        return (
          ""
        )
      }
    } else {
      return (<h3>No video feed</h3>)
    }
  }

  videoContent(){
    this.videoRendering = true
  }

  noVideoContent(){
    this.videoRendering = false
  }

  async setupVideo(){
    var video  = document.getElementById(this.videoElementID);
    this.videoElement = video.getElementsByTagName("video")[0];
    console.log("video elem")
    console.log(this.videoElement)
    var self = this
    navigator.mediaDevices.getUserMedia({video: self.state.videoConstraints})
      .then(mediaStream => {
        this.videoElement.srcObject = mediaStream;

        self.videoElementTrack = mediaStream.getVideoTracks()[0]
        self.videoElementCapabilities = this.videoElementTrack.getCapabilities();
        self.videoElementSettings = this.videoElementTrack.getSettings();
        console.log(self.videoElementCapabilities)
        console.log(self.videoElementSettings)
        self.optimizedZoomSupport()
        self.videoElement.setAttribute('autoPlay', 'true');
        self.videoElement.setAttribute('muted', 'true');
        self.videoElement.setAttribute('playsinline', 'true');
        self.videoElement.setAttribute('loop', 'true');
        self.videoElement.setAttribute('autobuffer', 'true');
        self.videoElement.load()
        self.playVideo()
      })
      .catch(error => console.log('Argh!', error.name || error));

    
  }

  setupCanvas(){
    var canvas = document.getElementById('qrcodecanvas');
    this.canvasParent = document.getElementById('qrcodeParent')
    canvas.width =   this.state.qrParentStyle.width
    canvas.height = this.state.qrParentStyle.height
    var ctx    = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    this.canvasElement = canvas
    this.canvasContext = ctx
  }

  decodeImage(data){
    
    if(data){
      const code = jsQR(
        data, 
        this.canvasElement.width, 
        this.canvasElement.height
      );
      if(code){

        Logger.info(`Code detected: ${code.data}`)
        this.onSuccessScan(code.data)
      } else {
        this.onErrorScan(code)
      }
    }
  } 

  // after the component is mounted, grab the device ID 
  componentDidMount(){
    console.log("getting video info...")
    var self = this
    var slider = document.getElementById("myRange");

    // DEPRECATED
    //this.__setupContinualScan()
    this.__compononentDidMount()
    this.setupCanvas()
    this.setupVideo()
    this.drawCanvasAndDecodeConinuously()
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

      if(this.state.optimizedZoomSupported){
        this.videoElementTrack.applyConstraints({advanced: [ {zoom: nZoomValue} ]});
      }
  }

  playVideo(){
    this.videoElement.play()
    this.videoPaused = false
  }


  stopVideo(){
    this.videoElement.pause()
    this.videoPaused = true
  }

  componentWillUnmount(){
    this.__componentDidUnMount()
    console.log("unloading barcode scanner")
  }

  onPlay(){
    alert('video starting..')
  }

  render() {
    return (
      <div id={this.state.containerElementID}>
        <div id={this.state.videoElementID}>
        <video style={this.videoStyle} playsinline autoplay muted loop></video>
        </div>
            <div id="qrcodeParent" style={this.state.qrParentStyle}>
            <div id="altText">
            {this.__altText()}
            </div>
            <canvas id="qrcodecanvas"
                width={this.state.qrParentStyle.width} 
                height={this.state.qrParentStyle.height}
                style={this.state.qrCanvasStyle}
            >
            </canvas>
          </div>
        <div class="slidecontainer" style={this.state.scrollerStyle}>  
          <input 
            type="range" 
            min={this.state.zoomFloor} 
            max={this.state.zoomCeiling} 
            value={this.state.zoom} 
            step=".1" 
            class="slider" 
            id="zvideoSlider" 
            
            onInput={this.updateZoomValue.bind(this)} 
          />
          <button class="videoButton" onClick={this.playVideo.bind(this)}><img src={playbutton} alt="Play Video" /></button>
          <button class="videoButton" onClick={this.stopVideo.bind(this)}><img src={pausebutton} alt="Pause Video" /></button>
        </div>
       {this.__getDebugImage()}
      </div>
    );
  }
}

          // <Webcam
          //   audio={false}
          //   height={this.state.qrParentStyle.height}
          //   width={this.state.qrParentStyle.width}
          //   videoConstraints={this.state.videoConstraints}
          // />

export default ZBarcodeScanner;