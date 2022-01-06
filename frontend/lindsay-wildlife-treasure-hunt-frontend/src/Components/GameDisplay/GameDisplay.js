import React from 'react';
import GameController from '../../src/game/Game';

import TopMessage from './TopMessage';
import ScanDisplay from './ScanDisplay';
import HintDisplay from './HintDisplay';
import AnswerDisplay from './AnswerDisplay';
import ManualEntryDisplay from './ManualEntryDisplay';
import TestZoomComponent from './TestZoomComponent';

import './GameDisplay.css';
import Logger from '../../src/util/Logger';
// Display Daddy
export class GameDisplay extends React.Component {
  static instance = null

  constructor(props) {
    super(props)
    GameDisplay.instance = this;
    GameController.loadSessionData();
    if(!GameController.gameState.gameStarted) {
      GameController.startGame();
    }

    this.state = {
      gameStarted: true,
      currentLevel: GameController.gameState.currentLevel,
      displayAnswer: (GameController.gameState.gameStarted ? GameController.getCorrectAnswerOnCurrentLevel() : false),
      lastGuessWrong: ((GameController.gameState.attemptsOnCurrentLevel > 0) ? true : false),
      attempts: (GameController.gameState.gameStarted ? GameController.gameState.attemptsOnCurrentLevel : 0),
      currentGuess: '',
      currentClue: (GameController.gameState.gameStarted ? GameController.getClue(GameController.gameState.currentArtifactIdInSequence) : ''),
      extraHint: (GameController.gameState.gameStarted ? GameController.getExtraHint(GameController.gameState.currentArtifactIdInSequence) : ''),
      displayExtraHint: false,
      artifactName: (GameController.gameState.gameStarted ? GameController.getArtifactName(GameController.gameState.currentArtifactIdInSequence) : ''),
      artifactText: (GameController.gameState.gameStarted ? GameController.getArtifactText(GameController.gameState.currentArtifactIdInSequence) : ''),
      artifactMediaUrl: (GameController.gameState.gameStarted ? GameController.getArtifactMediaUrl(GameController.gameState.currentArtifactIdInSequence) : ''),
      artifactPhotoCredit: (GameController.gameState.gameStarted ? GameController.getArtifactPhotoCredit(GameController.gameState.currentArtifactIdInSequence) : ''),
      readyForBarcode: true,
      numberOfArtifacts: GameController.gameState.gameStarted ? GameController.getNumberOfArtifacts() : 0,
      scannerOpen: false,
      manualEntryMode: false,
      gameComplete: GameController.gameState.gameComplete,
    }
  }

  updateGameState() {
    this.setState(
      {
        gameStarted: true,
        currentLevel: GameController.gameState.currentLevel,
        displayAnswer: (GameController.gameState.gameStarted ? GameController.getCorrectAnswerOnCurrentLevel() : false),
        lastGuessWrong: ((GameController.gameState.attemptsOnCurrentLevel > 0) ? true : false),
        attempts: (GameController.gameState.gameStarted ? GameController.gameState.attemptsOnCurrentLevel : 0),
        currentGuess: '',
        currentClue: (GameController.gameState.gameStarted ? GameController.getClue(GameController.gameState.currentArtifactIdInSequence) : ''),
        extraHint: (GameController.gameState.gameStarted ? GameController.getExtraHint(GameController.gameState.currentArtifactIdInSequence) : ''),
        artifactName: (GameController.gameState.gameStarted ? GameController.getArtifactName(GameController.gameState.currentArtifactIdInSequence) : ''),
        artifactText: (GameController.gameState.gameStarted ? GameController.getArtifactText(GameController.gameState.currentArtifactIdInSequence) : ''),
        artifactMediaUrl: (GameController.gameState.gameStarted ? GameController.getArtifactMediaUrl(GameController.gameState.currentArtifactIdInSequence) : ''),
        artifactPhotoCredit: (GameController.gameState.gameStarted ? GameController.getArtifactPhotoCredit(GameController.gameState.currentArtifactIdInSequence) : ''),
        readyForBarcode: true,
        numberOfArtifacts: GameController.getNumberOfArtifacts(),
        gameComplete: GameController.gameState.gameComplete,
        tryAgainClicked: false,
      }
    )
  }

  startGameButton() {
    
    this.setState({
      readyForBarcode: true,        
    })
    if(this.state.gameComplete) {
      window.location.href = '/ui/win';
    }
  }

  resetGame() {
    GameController.resetGame();
    this.updateGameState();
    this.setState({
      //readyForBarcode: false,
      manualEntryMode: false,     
    })
  }

  qrScannerUpdate(result) {
    Logger.info("qrScannerUpdate..")
    if (result) {
      Logger.info("Guessing")
      this.setState(
        {
          currentGuess: result,
          scannerOpen: false,
        }
      );
      this.checkAnswer(this.state.currentGuess)
      this.updateGameState();
    }
  }

  readyToScanButton() {
    this.setState({
      scannerOpen: !this.state.scannerOpen
    })
  }

  nextLevelButton() {
    GameController.nextLevel();
    GameController.saveState();
    this.setState({
      displayAnswer: false,
      displayExtraHint: false,
    });
    this.updateGameState();
    console.log(GameController.gameState.gameComplete)
    if(GameController.gameState.gameComplete) {
      window.location.href = '/ui/win';
    }
  }

  extraHintButton() {
    this.setState({
      displayExtraHint: true,
    })
  }

  checkAnswer() {
    GameController.checkAnswer(this.state.currentGuess);
    this.updateGameState();
  }

  manualEntryTextSubmitButton(e) {
    const textField = document.getElementById("manual-entry-text-field");
    this.state.currentGuess = textField.value.toLowerCase();
    textField.value = '';
    this.checkAnswer();
  }

  manualEntryModeButton() {
    this.setState({
      manualEntryMode: !this.state.manualEntryMode,
    })
  }

  getAnswerButton() {
    GameController.correctAnswer();
    GameController.saveState();
    this.updateGameState();
    this.setState({
      scannerOpen: false,
      displayAnswer: true,
      displayExtraHint: false,
    })
  }

  restartGameButton() {
    this.setState({
        tryAgainClicked: true,
    })
  }

  deleteProgress() {
    GameController.resetGame();
    GameController.gameState.gameComplete = false;
    
    GameController.saveState();
    this.updateGameState();
    this.setState({
      //readyForBarcode: false,
      manualEntryMode: false,  
      tryAgainClicked: false,   
    })
  }

  debugCorrectAnswerButton() {
    GameController.correctAnswer();
    GameController.saveState();
    this.updateGameState();
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
          attempts={this.state.attempts}
          startGameButton={this.startGameButton.bind(this)}
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
          attempts={this.state.attempts}
          getAnswerButton={this.getAnswerButton.bind(this)}
        />
        <ScanDisplay
          qrScannerUpdate={this}
          readyForBarcode={this.state.readyForBarcode}
          displayAnswer={this.state.displayAnswer}
          scannerOpen={this.state.scannerOpen}
          readyToScanButton={this.readyToScanButton.bind(this)}
          debugCorrectAnswerButton={this.debugCorrectAnswerButton.bind(this)}
          debugWrongAnswerButton={this.debugWrongAnswerButton.bind(this)}
          manualEntryMode={this.state.manualEntryMode}
        />
        <AnswerDisplay
          displayAnswer={this.state.displayAnswer}
          nextLevelButton={this.nextLevelButton.bind(this)}
          artifactName={this.state.artifactName}
          artifactText={this.state.artifactText}
          artifactMediaUrl={this.state.artifactMediaUrl}
        />
        <ManualEntryDisplay
          gameStarted={this.state.gameStarted}
          displayAnswer={this.state.displayAnswer}
          manualEntryMode={this.state.manualEntryMode}
          manualEntryTextSubmitButton={this.manualEntryTextSubmitButton.bind(this)}
          manualEntryModeButton={this.manualEntryModeButton.bind(this)}
        />
        <br/><br/>
        <RestartGameDisplay
          gameStarted={this.state.gameStarted}
          restartGameButton={this.restartGameButton.bind(this)}
          deleteProgress={this.deleteProgress.bind(this)}
          tryAgainClicked={this.state.tryAgainClicked}
        /><br/><br/>
        <PhotoCredit
          displayAnswer={this.state.displayAnswer}
          photoCredit={this.state.artifactPhotoCredit}
        />
      </div>
    );
  }
}

// Misc Components
function ResetGameButton(props) {
  if(props.gameStarted === true) {
    return(
      <RestartGameDisplay/>
    )
  }
  else return null;
}

// Restart Game Display

class RestartGameDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.gameStarted === true) {
      return(
          <div className="restart-game-container">
              <RestartGameButton
                  restartGameButton={this.props.restartGameButton}
                  tryAgainClicked={this.props.tryAgainClicked}
                  deleteProgress={this.props.deleteProgress.bind(this)}
              />
          </div>
      );
    }
    else return null;
  }
}

function RestartGameButton(props) {
  if(!props.tryAgainClicked) {
      return(
          <button
              className="game-button restart-game-button"
              onClick={props.restartGameButton}
          >
              Reset Game
          </button>
      );
  }
  else {
      return(
          <div className="game-text restart-game-button-container">
                  Are you sure? You'll lose your progress.<br/>
              <button
                  className="game-button restart-game-button"
                  onClick={props.deleteProgress}
              >
                  Reset Game
              </button>
          </div>
      );
  }
}

// Photo Credit

function PhotoCredit(props) {
  if(props.displayAnswer) {
    return(
      <div className="game-text photo-credit-container">
        Photo Credit: {props.photoCredit}
      </div>
    );
  }
  else return null;
}

export default GameDisplay;