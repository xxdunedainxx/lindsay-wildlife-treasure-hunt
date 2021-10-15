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
                        <p><i>If the QR scanner isn't working, you can enter your answer manually:</i></p>
                        <ManualEntryField
                            onClick={this.props.manualEntryTextSubmitButton}
                        />
                        <br/>
                        <br/>
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

function ManualEntryField(props) {
    return(
      <div className="manual-entry-input-container">
          <input 
            type="text"
            id="manual-entry-text-field"
          >
          </input>
          <br/>
          <button
            onClick={props.onClick}
          >
              Submit
          </button>
      </div>
    );
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
          onClick={props.onClick}
        >
          {buttonMessage}
        </button>
      </div>
    );
}

export default ManualEntryDisplay;