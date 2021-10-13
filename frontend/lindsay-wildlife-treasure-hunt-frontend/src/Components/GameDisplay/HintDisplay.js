import React from "react";

// Hint Display
class HintDisplay extends React.Component {

    constructor(props) {
      super(props);
    }
  
    render() {
      if(!this.props.displayAnswer && this.props.gameStarted) {
        return(
          <div className="hint-display">
            <DisplayCurrentClue
              currentClue={this.props.currentClue}
            />
            <DisplayExtraHint
              displayExtraHint={this.props.displayExtraHint}
              lastGuessWrong={this.props.lastGuessWrong}
              onClick={this.props.extraHintButton}
              extraHint={this.props.extraHint}
            />
          </div>
        );
      }
      else {
        return(null);
      }
    }
}
  
// Hint Display Components
function DisplayCurrentClue(props) {
    return(
        <div className="clue-text">
        {props.currentClue}
        </div>
    );
}

function DisplayExtraHint(props) {
    if(props.lastGuessWrong) {
        if(!props.displayExtraHint) {
        return(
            <button
            onClick={props.onClick}
            >Need a hint?</button>
        );
        }
        else{
        return(
            <div className="extra-hint-text">
            {props.extraHint}
            </div>
        );
        }
    }
    return null;
}

export default HintDisplay;