import React from "react";

export class ManualEntryDisplay extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.gameStarted && !this.props.displayAnswer) {
            if(!this.props.manualEntryMode) {
                return(
                    <div className="manual-entry-container">
                        <br/>
                        <br/>
                        <ManualEntryModeButton
                            manualEntryMode={this.props.manualEntryMode}
                            onClick={this.props.manualEntryModeButton}
                        />
                    </div>
                );
            }
            else {
                return(
                    <div className="manual-entry-container">
                        <br/>
                        <div className="game-text manual-entry-text">Enter the artifact's ID number:</div>
                        <ManualEntryNumpad
                            submitManualNumpad={this.props.submitManualNumpad}
                        />
                        <ManualEntryModeButton
                            manualEntryMode={this.props.manualEntryMode}
                            onClick={this.props.manualEntryModeButton}
                        />
                    </div>
                );
                
            }
        }
        else {
            return null;
        }
    }
}

// Manual Entry Display Components

class ManualEntryNumpad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayValue: "",
      displayIsFull: false
    }
  }

  digitPressed(digit) {
    if(!this.state.displayIsFull) {
      this.setState({
        displayValue: this.state.displayValue + digit
      })
      if(this.state.displayValue.length == 1) {
        this.setState({
          displayIsFull: true
        })
      }
    }
  }

  backspace() {
    this.setState({
      displayValue: this.state.displayValue.substring(0, this.state.displayValue.length - 1),
      displayIsFull: false
    })
  }

  handleClick(e) {
    if(e['target']['className'].includes("num-btn")) {
      this.digitPressed(e['target']['id'])
    }
    else if(e['target']['className'].includes("btn-del")) {
      this.backspace()
    }
    else if(e['target']['className'].includes("btn-submit")) {
      if(this.state.displayValue.length > 0) {
        this.props.submitManualNumpad(this.state.displayValue)
        this.setState({
          displayValue: "",
          displayIsFull: false
        })
        window.scrollTo(0,150)
      }
    }
  }

  render() {
    return(
      <div className="numpad-body">
        <div id="display" className="display">{this.state.displayValue}</div>
        <button id="btn-del" className="btn-del man-btn" onClick={(e)=> this.handleClick(e)}>&#8592;</button>
        <button id="btn-submit" className="btn-submit man-btn" onClick={(e)=> this.handleClick(e)}>Enter</button>
        <button id="0" className="btn-zero man-btn num-btn" onClick={(e)=> this.handleClick(e)}>0</button>
        <button id="1" className="btn-one man-btn num-btn" onClick={(e)=> this.handleClick(e)}>1</button>
        <button id="2" className="btn-two man-btn num-btn" onClick={(e)=> this.handleClick(e)}>2</button>
        <button id="3" className="btn-three man-btn num-btn" onClick={(e)=> this.handleClick(e)}>3</button>
        <button id="4" className="btn-four man-btn num-btn" onClick={(e)=> this.handleClick(e)}>4</button>
        <button id="5" className="btn-five man-btn num-btn" onClick={(e)=> this.handleClick(e)}>5</button>
        <button id="6" className="btn-six man-btn num-btn" onClick={(e)=> this.handleClick(e)}>6</button>
        <button id="7" className="btn-seven man-btn num-btn" onClick={(e)=> this.handleClick(e)}>7</button>
        <button id="8" className="btn-eight man-btn num-btn" onClick={(e)=> this.handleClick(e)}>8</button>
        <button id="9" className="btn-nine man-btn num-btn" onClick={(e)=> this.handleClick(e)}>9</button>
      </div>
    )
  }
}

export default ManualEntryDisplay;