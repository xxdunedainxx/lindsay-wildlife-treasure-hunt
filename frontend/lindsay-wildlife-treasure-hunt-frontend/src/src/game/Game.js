/*
  GameController
*/

import Logger from '../util/Logger';
import Session from "../util/Session";

// placeholder values
const lastLevel = 10
const maxIncorrectAttempts = 5

export class GameController {

  // if session data exists, loads it
  static Init(){
    Logger.info('init game controller')
    Logger.info(`Game controller gameState info ${JSON.stringify(GameController.gameState)}`)
    Session.Init()
    GameController.loadSessionData()
  }

  static gameState = {
    "gameStarted" : false,
    "currentLevel": null,
    "lastScannedBarcode": -1,
    "attemptsOnCurrentLevel": 0,
    "correctAnswerOnCurrentLevel": false,
    "gameInfo" : {

    }
  }

  static startGame() {
    GameController.gameState.gameStarted = true;
    GameController.gameState.lastScannedBarcode = 0;
    GameController.gameState.currentLevel = 1;
    GameController.gameState.attemptsOnCurrentLevel = 0;
    GameController.gameState.correctAnswerOnCurrentLevel = false;
    GameController.saveState();
  }

  static resetGame() {
    GameController.gameState.gameStarted = false;
    GameController.gameState.currentLevel = null;
    GameController.gameState.lastScannedBarcode = null;
    GameController.gameState.attemptsOnCurrentLevel = 0;
    GameController.gameState.correctAnswerOnCurrentLevel = false;
    GameController.saveState();
  }

  // if session data exists, loads it
  // sets gameState to loaded session data
  static loadSessionData() {
    GameController.gameState = Session.FetchSessionData()
   }

  static saveState() {
    Session.SetSessionData(GameController.gameState);
  }

  // checks answer and updates session with gameState
  // returns true if correct, false otherwise
  static checkAnswer(barcodeId) {
    GameController.gameState.lastScannedBarcode = barcodeId;
    // correct barcode for level n has id n+1
    if(GameController.gameState.lastScannedBarcode === GameController.currentLevel + 1) {
      GameController.correctAnswer();
    } else {
      GameController.wrongAnswer();
    }
    // update session data after each barcode scanned
    GameController.saveState();
  }

  static nextLevel() {
    // increment level
    GameController.gameState.currentLevel += 1;
    // reset attempt counter
    GameController.gameState.attemptsOnCurrentLevel = 0;
    GameController.gameState.correctAnswerOnCurrentLevel = false;
    GameController.saveState();
    // check if game is over
    // if(GameController.gameState.currentLevel > lastLevel) {
    //   GameController.completeGame()
    // }
  }

  static correctAnswer() {
    GameController.gameState.correctAnswerOnCurrentLevel = true;
  }

  static wrongAnswer() {
    GameController.gameState.attemptsOnCurrentLevel++;
  }

  static completeGame() {
    // send to "you win" splash page
    // send email
    // maybe a button to restart the game?
  }

  static getClue(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].Clue;
  }

  static getExtraHint(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].AdditionalHint;
  }

  static getArtifactName(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].ArtifactName;
  }

  static getArtifactText(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].CorrectMessage;
  }

  static getArtifactMediaUrl(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].MediaLink;
  }

  static getCorrectAnswerOnCurrentLevel() {
    return GameController.gameState.correctAnswerOnCurrentLevel;
  }

}

export default GameController;