import React from 'react';
import GameController from '../../src/game/Game';

import TopMessage from './TopMessage';
import ScanDisplay from './ScanDisplay';
import HintDisplay from './HintDisplay';
import AnswerDisplay from './AnswerDisplay';

import './GameDisplay.css';

// Display Daddy
export class GameDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameStarted: GameController.gameState.gameStarted,
      currentLevel: GameController.gameState.currentLevel,
      displayAnswer: (GameController.gameState.gameStarted ? GameController.getCorrectAnswerOnCurrentLevel() : false),
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
        displayAnswer: (GameController.gameState.gameStarted ? GameController.getCorrectAnswerOnCurrentLevel() : false),
        currentGuess: '',
        currentClue: (GameController.gameState.gameStarted ? GameController.getClue(GameController.gameState.currentLevel) : ''),
        extraHint: (GameController.gameState.gameStarted ? GameController.getExtraHint(GameController.gameState.currentLevel) : ''),
        artifactName: (GameController.gameState.gameStarted ? GameController.getArtifactName(GameController.gameState.currentLevel) : ''),
        artifactText: (GameController.gameState.gameStarted ? GameController.getArtifactText(GameController.gameState.currentLevel) : ''),
        artifactMediaUrl: (GameController.gameState.gameStarted ? GameController.getArtifactMediaUrl(GameController.gameState.currentLevel) : ''),
        readyForBarcode: GameController.gameState.gameStarted,
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
        /><br/><br/>
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