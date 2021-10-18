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

class ManualEntryField extends React.Component {
  constructor(props) {
    super(props);

    this.formPreventDefault = this.formPreventDefault.bind(this);
  }

  formPreventDefault(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return(
      <div className="manual-entry-form">
        <form
          onSubmit={this.formPreventDefault}
        >
          <input 
            type="text"
            id="manual-entry-text-field"
          >
          </input>
          <br/>
          <input
            className="manual-entry-submit"
            type="submit"
            value="Submit"
            onSubmit={this.formPreventDefault}
          >
          </input>
        </form>
      </div>
    );
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
          onClick={props.onClick}
        >
          {buttonMessage}
        </button>
      </div>
    );
}

export default ManualEntryDisplay;