import React from 'react';
import GameController from '../../src/game/Game';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

import './GameDisplay.css';

function TopMessage(props) {
  if(props.gameStarted === false) {
    return(
      <div className="top-message">Let's get started!<br/>
        <button
          className="game-start-button"
          onClick = {() => props.startGameButton()}
        >
          Start Game
        </button>
      </div>
    );
  } else if(props.currentLevel >= 0 && props.lastGuessIncorrect === false) {
    return(
      <div className="top-message">
        <DisplayCurrentLevel
          currentLevel={props.currentLevel}
        /><br/>
        Not quite, let's try again.
      </div>
    );
  } else if(props.currentLevel > 1 && props.lastGuessIncorrect === true) {
    return(
      <div className="top-message">
        <DisplayCurrentLevel
          currentLevel={props.currentLevel}
        /><br/>
        Nailed it!<br/>
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

function DisplayCurrentLevel(props) {
  return(
    <div className="current-level-text">
      Current level: {props.currentLevel}
    </div>
  );
}

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
  )
}

function DisplayCurrentHint(props) {
  return(
    <div className="hint-text">
      What's brown and lives in the woods?
    </div>
  )
}

class ScanDisplay extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.readyForBarcode) {
      if(this.props.scannerOpen === false) {
        return(
          <div className="scanner-container">
            <ReadyToScanButton
              onClick={this.props.readyToScanButtonClick}
              scannerOpen={this.props.scannerOpen}
            />
          </div>
        );
      } else {
        return(
          <div className="scanner-container">
            <ReadyToScanButton
              onClick={this.props.readyToScanButtonClick}
              scannerOpen={this.props.scannerOpen}
            />
            <BarcodeScanner
              qrScannerUpdate={this.props.qrScannerUpdate}
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

class HintDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    if(this.props.gameStarted) {
      return(
        <DisplayCurrentHint
          currentLevel={this.props.currentLevel}
        />
      );
    }
    else {
      return(null);
    }
  }

}

export class GameDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameStarted: GameController.gameState.gameStarted,
      currentLevel: GameController.gameState.currentLevel,
      lastGuessIncorrect: (GameController.gameState.attemptsOnCurrentLevel > 0)
                        ? true : false,
      currentChoice: '',
      currentHint: GameController.getHint(GameController.gameState.currentLevel),
      readyForBarcode: false,
      scannerOpen: false,
    }
  }

  updateGameState() {
    this.setState(
      {
        gameStarted: GameController.gameState.gameStarted,
        currentLevel: GameController.gameState.currentLevel,
        lastGuessCorrect: (GameController.gameState.attemptsOnCurrentLevel === 0)
                          ? true : false,
        currentHint: GameController.getHint(GameController.gameState.currentLevel),
      }
    )
  }

  startGameButton() {
    GameController.startGame();
    this.setState({
      gameStarted: GameController.gameState.gameStarted,
      currentLevel: GameController.gameState.currentLevel,
      readyForBarcode: true,        
    })
  }

  qrScannerUpdate(result) {
    if (result) {
      this.setState(
        {
          currentChoice: result.text,
          scannerOpen: false,
        }
      );
    }
    else {
      this.setState(
        {
          currentChoice: '',
        }
      );
    }
    let isCorrect = GameController.checkAnswer(this.state.currentChoice)
    this.updateGameState();
  }

  readyToScanButtonClick() {
    this.setState({
      scannerOpen: !this.state.scannerOpen
    })
  }

  render(){
    return(
      <div className="game-display-container">
        <TopMessage
          gameStarted={this.state.gameStarted}
          currentLevel={this.state.currentLevel}
          lastGuessIncorrect={this.state.lastGuessCorrect}
          startGameButton={this.startGameButton.bind(this)}
          qrScannerUpdate={this.qrScannerUpdate.bind(this)}
        />
        <HintDisplay
          gameStarted={this.state.gameStarted}
          currentLevel={this.state.currentLevel}
        />
        <ScanDisplay
          readyForBarcode={this.state.readyForBarcode}
          scannerOpen={this.state.scannerOpen}
          readyToScanButtonClick={this.readyToScanButtonClick.bind(this)}
        />
      </div>
    );
  }
}

export default GameDisplay;