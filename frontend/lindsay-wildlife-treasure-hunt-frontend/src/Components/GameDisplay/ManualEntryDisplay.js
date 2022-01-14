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
      displayValueSize: 1,
      displayIsFull: false
    }
  }

  digitPressed(digit) {
    if(!this.state.displayIsFull) {
      this.setState({
        displayValue: this.state.displayValue + digit
      })
      if(this.state.displayValue.length >= this.state.displayValueSize) {
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

  handleClickNumber(e) {
    this.digitPressed(e['target']['id'])
  }

  handleClickSubmit(e) {
    if(this.state.displayValue.length > 0) {
      this.props.submitManualNumpad(this.state.displayValue)
      this.setState({
        displayValue: "",
        displayIsFull: false
      })
      window.scrollTo(0,150)
    }
  }

  handleClickBackspace(e) {
    this.backspace()
  }

  render() {
    return(
      <div className="numpad-body">
        <div id="display" className="display">{this.state.displayValue}</div>
        <button id="btn-del" className="btn-del man-btn" onClick={(e)=> this.handleClickBackspace(e)}>&#8592;</button>
        <button id="btn-submit" className="btn-submit man-btn" onClick={(e)=> this.handleClickSubmit(e)}>Enter</button>
        <button id="0" className="btn-zero man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>0</button>
        <button id="1" className="btn-one man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>1</button>
        <button id="2" className="btn-two man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>2</button>
        <button id="3" className="btn-three man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>3</button>
        <button id="4" className="btn-four man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>4</button>
        <button id="5" className="btn-five man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>5</button>
        <button id="6" className="btn-six man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>6</button>
        <button id="7" className="btn-seven man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>7</button>
        <button id="8" className="btn-eight man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>8</button>
        <button id="9" className="btn-nine man-btn num-btn" onClick={(e)=> this.handleClickNumber(e)}>9</button>
      </div>
    )
  }
}

function ManualEntryModeButton(props) {
  let buttonMessage;
  if(props.manualEntryMode) {
    buttonMessage = "Scanner Mode"
  }
  else {
    buttonMessage = "Scanner not working?"
  }
  return(
    <div>
      <button
        className="game-button"
        onClick={props.onClick}
      >
        <i>{buttonMessage}</i>
      </button>
    </div>
  );
}

export default ManualEntryDisplay;