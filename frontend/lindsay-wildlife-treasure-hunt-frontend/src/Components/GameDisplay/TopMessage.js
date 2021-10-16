import React from 'react';

// Top Message
function TopMessage(props) {
    if(props.gameStarted === false) {
      return(
        <div className="top-message">
          Welcome to the treasure hunt!<br/>
          Let's get started.<br/>
          <button
            className="game-start-button"
            onClick = {() => props.startGameButton()}
          >
            Start Game
          </button>
        </div>
      );
    } else if(props.displayAnswer) {
      const correctMessages = ["Nailed it!",
                         "Nice job!",
                         "You got it!",
                         "Another one in the bag!"]
      return(
        <div className="top-message">
          <h3>{correctMessages[props.currentLevel %correctMessages.length]}</h3>
        </div>
      );
    } else if(props.lastGuessWrong === true) {
      const incorrectMessages = ["Not quite, let's try again.",
                                 "Hmm, let's give it another try.",
                                 "That wasn't it, but I know you can do this!"];
      return(
        <div className="top-message">
          <DisplayCurrentLevel
            currentLevel={props.currentLevel}
          /><br/>
          <h3>{incorrectMessages[(props.attempts - 1)%incorrectMessages.length]}</h3><br/>
        </div>
      );
    } else {
      return(
        <div className="top-message">
          <DisplayCurrentLevel
            currentLevel={props.currentLevel}
          /><br/>
        </div>
      );
    }
  }
  
  // Top Message Components
  function DisplayCurrentLevel(props) {
    return(
      <div className="current-level-text">
        Current level: {props.currentLevel}
      </div>
    );
  }

export default TopMessage;