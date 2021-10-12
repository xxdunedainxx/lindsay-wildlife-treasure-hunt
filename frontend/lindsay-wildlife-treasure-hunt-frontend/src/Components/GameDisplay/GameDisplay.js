import React from 'react';
import GameController from '../../src/game/Game';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

import './GameDisplay.css';

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

// Scan Display
class ScanDisplay extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.displayAnswer && this.props.readyForBarcode) {
      if(this.props.scannerOpen === false) {
        return(
          <div className="scanner-container">
            <ReadyToScanButton
              onClick={this.props.readyToScanButton}
              scannerOpen={this.props.scannerOpen}
            />
          </div>
        );
      } else {
        return(
          <div className="scanner-container">
            <BarcodeScanner
              qrScannerUpdate={this.props.qrScannerUpdate}
            />
            <br/>
            <ReadyToScanButton
              onClick={this.props.readyToScanButton}
              scannerOpen={this.props.scannerOpen}
            />
            <DebugCorrectAnswerButton
              onClick={this.props.debugCorrectAnswerButton}
            />
            <DebugWrongAnswerButton
              onClick={this.props.debugWrongAnswerButton}
            />
          </div>
        );
      }
      
    }
    return(
        null
    );
  }
}

// Scan Display Components
function ReadyToScanButton(props) {
  const buttonDisplay = props.scannerOpen ? "Close scanner" : "Open scanner";
  return(
    <button
      onClick={props.onClick}
    >
      {buttonDisplay}
    </button>
  );
}

function BarcodeScanner(props) {
  return(
    <BarcodeScannerComponent
      width={500}
      height={500}
      onUpdate={(err, result) => {
        props.qrScannerUpdate(result)
      }}
    />
  );
}

function DebugCorrectAnswerButton(props) {
  return(
    <button
      onClick={props.onClick}
    >
      Correct Answer
    </button>
  );
}

function DebugWrongAnswerButton(props) {
  return(
    <button
      onClick={props.onClick}
    >
      Wrong Answer
    </button>
  );
}


// Hint Display
class HintDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
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

// Answer Display
export class AnswerDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.displayAnswer) {
      return(
        <div className="display-answer-container">
          <h1 className="artifact-name">
            {this.props.artifactName}
          </h1>
          <img
            className="artifact-image"
            src={this.props.artifactMediaUrl}
          /><br/>
          <p className="artifact-text">
            {this.props.artifactText}
          </p><br/>
          <NextLevelButton
            onClick={this.props.nextLevelButton}
          />
        </div>
      );
    }
    return null;
  }
}

// Answer Display Components
function NextLevelButton(props) {
  return(
    <button
      onClick={props.onClick}
    >
      Next Level
    </button>
  );
}

// Display Daddy
export class GameDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameStarted: GameController.gameState.gameStarted,
      currentLevel: GameController.gameState.currentLevel,
      displayAnswer: false,
      lastGuessWrong: false,
      currentGuess: '',
      currentClue: (GameController.gameState.gameStarted ? GameController.getClue(GameController.gameState.currentLevel) : ''),
      extraHint: (GameController.gameState.gameStarted ? GameController.getExtraHint(GameController.gameState.currentLevel) : ''),
      displayExtraHint: false,
      artifactName: (GameController.gameState.gameStarted ? GameController.getArtifactName(GameController.gameState.currentLevel) : ''),
      artifactText: (GameController.gameState.gameStarted ? GameController.getArtifactText(GameController.gameState.currentLevel) : ''),
      artifactMediaUrl: (GameController.gameState.gameStarted ? GameController.getArtifactMediaUrl(GameController.gameState.currentLevel) : ''),
      readyForBarcode: GameController.gameState.gameStarted,
      scannerOpen: false,
    }
  }

  updateGameState() {
    this.setState(
      {
        gameStarted: GameController.gameState.gameStarted,
        currentLevel: GameController.gameState.currentLevel,
        lastGuessWrong: (GameController.gameState.attemptsOnCurrentLevel === 0)
                          ? false : true,
        currentClue: GameController.getClue(GameController.gameState.currentLevel),
        extraHint: GameController.getExtraHint(GameController.gameState.currentLevel),
        artifactName: GameController.getArtifactName(GameController.gameState.currentLevel),
        artifactText: GameController.getArticaftText(GameController.gameState.currentLevel),
        artifactMediaUrl: GameController.getArtifactMediaUrl(GameController.gameState.currentLevel)
      }
    )
  }

  startGameButton() {
    GameController.startGame();
    this.updateGameState();
    this.setState({
      readyForBarcode: true,        
    })
  }

  qrScannerUpdate(result) {
    if (result) {
      this.setState(
        {
          currentGuess: result.text,
          scannerOpen: false,
        }
      );
    }
    else {
      this.setState(
        {
          currentGuess: '',
        }
      );
    }
    let isCorrect = GameController.checkAnswer(this.state.currentGuess)
    this.updateGameState();
  }

  readyToScanButton() {
    this.setState({
      scannerOpen: !this.state.scannerOpen
    })
  }

  nextLevelButton() {
    GameController.nextLevel();
    this.setState({
      displayAnswer: false,
      displayExtraHint: false,
    });
    this.updateGameState();
  }

  extraHintButton() {
    this.setState({
      displayExtraHint: true,
    })
  }

  debugCorrectAnswerButton() {
    this.setState({
      scannerOpen: false,
      displayAnswer: true,
      displayExtraHint: false,
    })
  }

  debugWrongAnswerButton() {
    this.setState({
      scannerOpen: false,
    })
    GameController.wrongAnswer();
    this.updateGameState();
  }

  render(){
    return(
      <div className="game-display-container">
        <TopMessage
          gameStarted={this.state.gameStarted}
          currentLevel={this.state.currentLevel}
          displayAnswer={this.state.displayAnswer}
          lastGuessWrong={this.state.lastGuessWrong}
          startGameButton={this.startGameButton.bind(this)}
          qrScannerUpdate={this.qrScannerUpdate.bind(this)}
        />
        <HintDisplay
          gameStarted={this.state.gameStarted}
          displayAnswer={this.state.displayAnswer}
          currentLevel={this.state.currentLevel}
          currentClue={this.state.currentClue}
          lastGuessWrong={this.state.lastGuessWrong}
          extraHint={this.state.extraHint}
          extraHintButton={this.extraHintButton.bind(this)}
          displayExtraHint={this.state.displayExtraHint}
        />
        <AnswerDisplay
          displayAnswer={this.state.displayAnswer}
          nextLevelButton={this.nextLevelButton.bind(this)}
          artifactName={this.state.artifactName}
          artifactText={this.state.artifactText}
          artifactMediaUrl={this.state.artifactMediaUrl}
        />
        <ScanDisplay
          readyForBarcode={this.state.readyForBarcode}
          displayAnswer={this.state.displayAnswer}
          scannerOpen={this.state.scannerOpen}
          readyToScanButton={this.readyToScanButton.bind(this)}
          debugCorrectAnswerButton={this.debugCorrectAnswerButton.bind(this)}
          debugWrongAnswerButton={this.debugWrongAnswerButton.bind(this)}
        />
      </div>
    );
  }
}

export default GameDisplay;