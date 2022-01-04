import React from 'react';

//https://www.npmjs.com/package/qrcode-reader
import Webcam from 'react-webcam'
//https://www.npmjs.com/package/jsqr
import jsQR from "jsqr";
import QrCode from 'qrcode-reader';
import './ZBarcodeScanner.css';
import HttpArgParser from '../../src/util/HttpArgParser';

class ZBarcodeScanner extends React.Component {

 constructor(props) {
    super(props)
    console.log("start zbarcode scanner")
    this.qr_reader = new QrCode()
    this.__setupClassVariables(props)
    this.__setupScanCallBacks(props)

    // DEPRECATED this.__setupCodeReader()
    this.videoStyle = {
      visibility: "hidden",
      display: "none"
    }

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

    this.state = {
      videoElementID: this.videoElementID,
      containerElementID: this.containerElementID,
      width: 500,
      scanEnabled: false,
      height: 375,
      videoConstraints : {
        width: 500,
        height: 375,
        facingMode: "environment"
      },
      zoom: 1.0,
      zoomFloor: 1.0,
      zoomCeiling: 10.0,
      qrParentStyle: {
        // ensure to maintain a 4:3 aspect ratio when scaling
        width: 500,
        height: 375,
        margin: "auto"
      },
      scrollerStyle: {
        width: 400,
        margin: "auto"
      }
    }

    if(window.innerWidth < 640) {
      console.log("override ZBarCodeScanner width and height!")
      this.state.qrParentStyle = {
        width: 400,
        height: 300,
        margin: "auto"
      }
      this.state.scrollerStyle = {
        width: 300,
        margin: "auto"
      }
      console.log(this.state)
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
    if(HttpArgParser.DEBUG_MODE == "true"){
      return (<img id="barcodeimgElement" style={this.videoStyle} />)
    } else{
      return ("")
    }
  }

  defaultOnSuccessScan(result){ console.log(result); alert(result) }
  defaultOnErrorScan(error){} // default no-op

  async drawCanvasAndDecodeConinuously(){
    // Cache reference to this object
    var self = this
    function loop() {
      if (self.videoElement != undefined && !self.videoElement.paused && !self.videoElement.ended) {
          self.canvasContext.setTransform(1,0,0,1,0,0);
          self.canvasContext.clearRect(0,0,self.canvasElement.width,self.canvasElement.height);
          self.canvasContext.scale(self.state.zoom * 2, self.state.zoom * 2);
          self.canvasContext.drawImage(
            self.videoElement,
            self.canvasElement.width / 2, self.canvasElement.height / 2, // sx, sy
            self.canvasElement.width,self.canvasElement.height, // swidth, sheight
            0,0, //dx, dy <-- dont touch, effects destination x / y cropping
            self.canvasElement.width,self.canvasElement.height // dwidth, dheight
          );

          var pngUrl = self.canvasElement.toDataURL();
          var pixelData = self.canvasContext.getImageData(0,0,self.canvasElement.width,self.canvasElement.height)

          var img = document.getElementById('barcodeimgElement')
          if(img != undefined) {
            img.src = pngUrl
          }
          self.decodeImage(pixelData.data)
      } else {
        // console.log(self.videoElement)
      }
      window.requestAnimationFrame(loop)
      //setTimeout(loop, 1000 / 120); // drawing at 30fps
    }
    loop()
  }

  setupVideo(){
    var video  = document.getElementById(this.videoElementID);
    this.videoElement = video.getElementsByTagName("video")[0];

    this.videoElement.setAttribute('autoplay', 'true');
    this.videoElement.setAttribute('muted', 'true');
    this.videoElement.setAttribute('playsinline', 'true');
    this.videoElement.style.display = this.videoStyle.display
    this.videoElement.style.visibility = this.videoStyle.visibility
    this.videoElement.play()
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
      const code = jsQR(data, this.canvasElement.width, this.canvasElement.height);
      if(code){
        console.log(code.data)
        alert(`Decoding ${code.data}`)
        this.onSuccessScan(code.data)
      } else {
        this.onErrorScan(code)
      }
    }
  } 

  // after the component is mounted, grab the device ID 
  componentDidMount(){
    console.log("getting video info...")
    // const hdConstraints = {
    //   video: { width: { min: 1280 }, height: { min: 720 }, facingMode: { exact: "environment" }},
    // };
    // let video = document.getElementById(this.videoElementID)
    // navigator.mediaDevices.getUserMedia(hdConstraints).then((stream) => {
    //     video.srcObject = stream;
    // });
    var self = this
    var slider = document.getElementById("myRange");

    // DEPRECATED
    //this.__setupContinualScan()
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
  }

  componentWillUnmount(){
    console.log("unloading barcode scanner")
  }

  render() {
    return (
      <div id={this.state.containerElementID}>
            <div id="qrcodeParent" style={this.state.qrParentStyle}>
            {this.__getDebugImage()}
            <canvas id="qrcodecanvas"
                width={this.state.qrParentStyle.width} 
                height={this.state.qrParentStyle.height}
            >
            </canvas>
          </div>
        <div class="slidecontainer">
          <input 
            type="range" 
            min={this.state.zoomFloor} 
            max={this.state.zoomCeiling} 
            value={this.state.zoom} 
            step=".1" 
            class="slider" 
            id="zvideoSlider" 
            style={this.state.scrollerStyle}
            onInput={this.updateZoomValue.bind(this)} 
          />
        </div>

        <div id={this.state.videoElementID}>
          <Webcam
            audio={false}
            height={this.state.qrParentStyle.height}
            width={this.state.qrParentStyle.width}
            videoConstraints={this.state.videoConstraints}
          />
        </div>
      </div>
    );
  }
}

export default ZBarcodeScanner;