import React from "react";

class DisplayCurrentClue extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentClue: this.props.currentClue
      }
    }

    render(){
      return (
        <div className="clue-text game-text">
          {this.state.currentClue}
        </div>
      )
    }
}

export default DisplayCurrentClue;