import React from 'react';
import GameController from '../../src/game/Game';

import TopMessage from './TopMessage';
import ScanDisplay from './ScanDisplay';
import HintDisplay from './HintDisplay';
import AnswerDisplay from './AnswerDisplay';
import ManualEntryDisplay from './ManualEntryDisplay';

import './GameDisplay.css';

// Display Daddy
export class GameDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameStarted: GameController.gameState.gameStarted,
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
      readyForBarcode: GameController.gameState.gameStarted,
      numberOfArtifacts: GameController.getNumberOfArtifacts(),
      scannerOpen: false,
      manualEntryMode: false,
    }
  }

  updateGameState() {
    this.setState(
      {
        gameStarted: GameController.gameState.gameStarted,
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
        readyForBarcode: GameController.gameState.gameStarted,
        numberOfArtifacts: GameController.getNumberOfArtifacts(),
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

  resetGame() {
    GameController.resetGame();
    this.updateGameState();
    this.setState({
      readyForBarcode: false,
      manualEntryMode: false,     
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
    GameController.saveState();
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

  checkAnswer() {
    GameController.checkAnswer(this.state.currentGuess);
    this.updateGameState();
  }

  manualEntryTextSubmitButton() {
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
        <AnswerDisplay
          displayAnswer={this.state.displayAnswer}
          nextLevelButton={this.nextLevelButton.bind(this)}
          artifactName={this.state.artifactName}
          artifactText={this.state.artifactText}
          artifactMediaUrl={this.state.artifactMediaUrl}
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
        <ManualEntryDisplay
          gameStarted={this.state.gameStarted}
          displayAnswer={this.state.displayAnswer}
          manualEntryMode={this.state.manualEntryMode}
          manualEntryTextSubmitButton={this.manualEntryTextSubmitButton.bind(this)}
          manualEntryModeButton={this.manualEntryModeButton.bind(this)}
        />
        <br/><br/>
        <ResetGameButton
          onClick={this.resetGame.bind(this)}
        />
      </div>
    );
  }
}

// Misc Components
function ResetGameButton(props) {
  return(
    <button
      onClick={props.onClick}
    >
      Reset Game
    </button>
  )
}

export default GameDisplay;