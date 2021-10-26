import React from 'react';

// Top Message
function TopMessage(props) {
    if(props.gameStarted === false) {
      return(
        <div className="game-text top-message">
          <h1 className="welcome-top-msg">Welcome to the treasure hunt!</h1>
          <h5 className="welcome-sub-msg">Let's get started.</h5>
          <button
            className="game-button game-start-button"
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
          <h3 className="game-text">{correctMessages[props.currentLevel %correctMessages.length]}</h3>
        </div>
      );
    } else if(props.lastGuessWrong === true) {
      const incorrectMessages = ["Not quite, let's try again.",
                                 "Hmm, let's give it another try.",
                                 "That wasn't it, but I know you can do this!"];
      return(
        <div className="top-message">
          <DisplayCurrentLevel
            className="game-text"
            currentLevel={props.currentLevel}
          /><br/>
          <h3 className="game-text">{incorrectMessages[(props.attempts - 1)%incorrectMessages.length]}</h3><br/>
        </div>
      );
    } else {
      return(
        <div className="top-message">
          <DisplayCurrentLevel
            className="game-text"
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