import React from "react";

import GameDisplay from '../../../GameDisplay';

class DisplayExtraHint extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayExtraHint: this.props.displayExtraHint,
        lastGuessWrong  : this.props.lastGuessWrong,
        extraHintText   : this.props.extraHintText
      }
    }

    displayExtraHintOnClick(){
      alert('displaying hint?')
      this.setState(
        {
          displayExtraHint: true
        }
      );
    }

    render(){
      if(this.state.lastGuessWrong) {
        if(!this.state.displayExtraHint) {
            return(
                <button
                  className="game-button"
                  onClick={this.displayExtraHintOnClick.bind(this)}
                >Need a hint?</button>
            );
            }
            else {
              return(
                  <div className="extra-hint-text">
                  {this.props.extraHintText}
                  </div>
              );
            }
        }
      else {
        return null;
      }
    }
}

export default DisplayExtraHint;