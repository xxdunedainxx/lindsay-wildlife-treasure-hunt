import React from "react";
import GameDisplay from '../../GameDisplay';

import DisplayCurrentClue from './components/DisplayCurrentClue';
import DisplayExtraHint from './components/DisplayExtraHint';
import './HintDisplay.css'

// Hint Display
class HintDisplay extends React.Component {

    fullscreen(){
      this.setState(
        {
          fullscreen: true
        }
      );
    }

    exitFullScreen(){
      this.setState(
        {
          fullscreen: false
        }
      );
    }

    constructor(props) {
      super(props);
      this.state = {
        fullscreen: false
      }
    }

    componentDidMount() {
      GameDisplay.INSTANCE.hintDisplay = this
    }
  
    render() {
      if(!this.props.displayAnswer && this.props.gameStarted) {
        return(
          <div className={(this.state.fullscreen == false ? "hint-display" : "hint-display hint-display-fullscreen")}>
            <DisplayCurrentClue
              currentClue={this.props.currentClue}
            />
            <DisplayExtraHint
              displayExtraHint={this.props.displayExtraHint}
              lastGuessWrong={this.props.lastGuessWrong}
              onClick={this.props.extraHintButton}
              extraHintText={this.props.extraHint}
            />
            <GetAnswerButton
              attempts={this.props.attempts}
              onClick={this.props.getAnswerButton}
            />
          </div>
        );
      }
      else {
        return(null);
      }
    }
}
  
// // Hint Display Components
// function DisplayCurrentClue(props) {
//     return(
//         <div className="clue-text game-text">
//         {props.currentClue}
//         </div>
//     );
// }

// function DisplayExtraHint(props) {
//   if(props.lastGuessWrong) {
//       if(!props.displayExtraHint) {
//       return(
//           <button
//             className="game-button"
//             onClick={props.onClick}
//           >Need a hint?</button>
//       );
//       }
//       else{
//       return(
//           <div className="extra-hint-text">
//           {props.extraHint}
//           </div>
//       );
//       }
//   }
//   return null;
// }

function GetAnswerButton(props) {
  if(props.attempts >= 3) {
    return(
      <button
        onClick={props.onClick}
      >Ready for the answer?</button>
    );
  }
  else{
    return null;
  }
}

export default HintDisplay;