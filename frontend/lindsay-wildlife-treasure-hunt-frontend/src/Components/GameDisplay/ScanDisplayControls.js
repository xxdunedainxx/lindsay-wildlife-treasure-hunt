import React from "react";
import expandIcon from '../../assets/expand-solid.svg';
import closeIcon from '../../assets/close.svg';
import './ScanDisplayControls.css';
import GameDisplay from './GameDisplay';

class ScanDisplayControls extends React.Component {
    constructor(props) {
      super(props);
      this.parent = props.parentComponent; 
      this.parent.scanDisplayControls = this;
      this.topPosition = 0
      this.leftPosition = 0
      this.state = {
        className : "",
        topPosition: 0,
        leftPosition: 0,
        width: 50,
        enabled: false
      }

      /// listen to resize events..
      window.addEventListener('resize', this.render)
    }

    positionControls(yPosition, xPosition, parentWidth){
      console.log(parentWidth)
      console.log('overriding top position')
      console.log('resetting position controls')
      let calculatedTop = yPosition //+ (.25 * yPosition)
      let calculatedLeft = xPosition //+ (.15 * xPosition)
      this.setState(
        {
          topPosition: calculatedTop,
          leftPosition: calculatedLeft,
          width: parentWidth 
        }
      )
      console.log(this.state)
      this.render()
    }

    setClassName(nName) {
      this.setState({
        className: nName
      })
      this.render()
    }

    enableControls(){
      this.setState({
        enabled: true
      })
      this.render()
    }

    disableControls(){
      this.setState({
        enabled: false
      })
      this.render()
    }

    exitFullScreenClick(){
      console.log("exit full screen..")
      GameDisplay.INSTANCE.exitFullScreenScannerView()
    }

    fullScreenClick(){
      GameDisplay.INSTANCE.fullScreenScannerView()
    }

    visible(){
      console.log('making visible')
      this.setClassName("scan-display-control-visible")
    }

    invisible(){
      console.log('making invisible')
      this.setClassName("scan-display-control-invisible")
    }

    render() {
      console.log(this.state)
      if(this.state.enabled) {
        return (
        <div 
          id="scannerDisplayControls" 
          className={"scan-display-controller-default" + (this.state.className != undefined ? (' ' + this.state.className) : '')}
          style={{
            width: this.state.width,
            top: this.state.topPosition,
            left: this.state.leftPosition,
          }}
        >
          <img 
           className="scannerDisplayControl" 
           id="expandElem" 
           src={expandIcon}  
           onClick={this.fullScreenClick.bind(this)} 
           style={{
            float: "left"
          }}
          />
          <img 
            className="scannerDisplayControl" 
            id="closeElem" 
            src={closeIcon}  
            onClick={this.exitFullScreenClick.bind(this)} 
            style={{
              float: "right"
            }}
          />
        </div>
      )
      } else{
        return (<div>
        </div>)
      }
     
    }
}

export default ScanDisplayControls;