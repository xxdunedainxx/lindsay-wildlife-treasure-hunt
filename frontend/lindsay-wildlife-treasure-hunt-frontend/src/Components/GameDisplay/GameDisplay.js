import React from 'react';
import GameController from '../../src/game/Game';

import TopMessage from './TopMessage';
import ScanDisplay from './ScanDisplay';
import HintDisplay from './HintDisplay';
import AnswerDisplay from './AnswerDisplay';
import ManualEntryDisplay from './ManualEntryDisplay';

import HttpArgParser from '../../src/util/HttpArgParser';

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
    let width, height
    width = window.innerWidth * .95
    height = window.innerHeight

    this.state = {
      gameStarted: true,
      currentLevel: GameController.gameState.currentLevel,
      displayAnswer: (GameController.gameState.gameStarted ? GameController.getCorrectAnswerOnCurrentLevel() : false),
      lastGuessWrong: ((GameController.gameState.attemptsOnCurrentLevel > 0) ? true : false),
      attempts: (GameController.gameState.gameStarted ? GameController.gameState.attemptsOnCurrentLevel : 0),
      currentGuess: '',
      currentClue: (GameController.gameState.gameStarted ? GameController.getClue(GameController.gameState.currentArtifactIdxInSequence) : ''),
      extraHint: (GameController.gameState.gameStarted ? GameController.getExtraHint(GameController.gameState.currentArtifactIdxInSequence) : ''),
      displayExtraHint: false,
      artifactName: (GameController.gameState.gameStarted ? GameController.getArtifactName(GameController.gameState.currentArtifactIdxInSequence) : ''),
      artifactId: (GameController.gameState.gameStarted ? GameController.getArtifactId(GameController.gameState.currentArtifactIdxInSequence) : ''),
      artifactText: (GameController.gameState.gameStarted ? GameController.getArtifactText(GameController.gameState.currentArtifactIdxInSequence) : ''),
      artifactMediaUrl: (GameController.gameState.gameStarted ? GameController.getArtifactMediaUrl(GameController.gameState.currentArtifactIdxInSequence) : ''),
      artifactPhotoCredit: (GameController.gameState.gameStarted ? GameController.getArtifactPhotoCredit(GameController.gameState.currentArtifactIdxInSequence) : ''),
      readyForBarcode: true,
      numberOfArtifacts: GameController.gameState.gameStarted ? GameController.getNumberOfArtifacts() : 0,
      scannerOpen: false,
      manualEntryMode: false,
      gameComplete: GameController.gameState.gameComplete,
      gameDisplayStyle: {
        'width': width,
        'height': height,
        'overflowX' : 'hidden',
        // 'overflowY' : 'hidden'
      }
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
        currentClue: (GameController.gameState.gameStarted ? GameController.getClue(GameController.gameState.currentArtifactIdxInSequence) : ''),
        extraHint: (GameController.gameState.gameStarted ? GameController.getExtraHint(GameController.gameState.currentArtifactIdxInSequence) : ''),
        artifactName: (GameController.gameState.gameStarted ? GameController.getArtifactName(GameController.gameState.currentArtifactIdxInSequence) : ''),
        artifactId: (GameController.gameState.gameStarted ? GameController.getArtifactId(GameController.gameState.currentArtifactIdxInSequence) : ''),
        artifactText: (GameController.gameState.gameStarted ? GameController.getArtifactText(GameController.gameState.currentArtifactIdxInSequence) : ''),
        artifactMediaUrl: (GameController.gameState.gameStarted ? GameController.getArtifactMediaUrl(GameController.gameState.currentArtifactIdxInSequence) : ''),
        artifactPhotoCredit: (GameController.gameState.gameStarted ? GameController.getArtifactPhotoCredit(GameController.gameState.currentArtifactIdxInSequence) : ''),
        readyForBarcode: true,
        numberOfArtifacts: GameController.getNumberOfArtifacts(),
        gameComplete: GameController.gameState.gameComplete,
        tryAgainClicked: false,
        manualEntryMode: this.state.manualEntryMode
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
      let answerText = result.text
      this.setState(
        {
          currentGuess: answerText,
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

  checkAnswerNumber(number) {
    GameController.checkAnswerNumber(number)
    this.updateGameState()
  }

  manualEntryModeButton() {
    this.setState({
      manualEntryMode: !this.state.manualEntryMode,
    })
  }

  submitManualNumpad(guess) {
    this.checkAnswerNumber(guess)
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

  debuggerUI(){
    if(HttpArgParser.DEBUG_MODE == "true") {
        return (
          <div>
            <h1>DEBUGGER</h1>
            <div>
              Level {this.state.currentLevel} out of {GameController.gameSequenceSize}
            </div>
          </div>
        )
      } else {
        return ("");
      }
  }

  render(){
    return(
      <div className="game-display-container" style={this.state.gameDisplayStyle}>
        <h2 className="game-display-question-header">Question: {this.state.currentLevel}</h2>
        <HintDisplay
          gameStarted={this.state.gameStarted}
          displayAnswer={this.state.displayAnswer}
          currentLevel={this.state.currentLevel}
          currentClue={this.state.currentClue}
          artifactId={this.state.artifactId}
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
          submitManualNumpad={this.submitManualNumpad.bind(this)}
          manualEntryModeButton={this.manualEntryModeButton.bind(this)}
        />
        <br/><br/>
        <RestartGameDisplay
          gameStarted={this.state.gameStarted}
          restartGameButton={this.restartGameButton.bind(this)}
          deleteProgress={this.deleteProgress.bind(this)}
          tryAgainClicked={this.state.tryAgainClicked}
        />
        <br/><br/>
        <PhotoCredit
          displayAnswer={this.state.displayAnswer}
          photoCredit={this.state.artifactPhotoCredit}
        />
        {this.debuggerUI()}
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