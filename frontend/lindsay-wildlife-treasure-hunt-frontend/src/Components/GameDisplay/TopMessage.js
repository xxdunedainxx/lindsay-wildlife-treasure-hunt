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
      return(
        <div className="top-message">
          <h3>Nailed it!</h3>
        </div>
      );
    } else if(props.lastGuessWrong === true) {
      return(
        <div className="top-message">
          <DisplayCurrentLevel
            currentLevel={props.currentLevel}
          /><br/>
          <h3>Not quite, let's try again. </h3><br/>
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