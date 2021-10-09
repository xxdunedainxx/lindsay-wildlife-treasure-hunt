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
    // -1: pre-startGame state
    "gameStarted" : false,
    "currentLevel": -1,
    "lastScannedBarcode": -1,
    "attemptsOnCurrentLevel": 0,
    "gameInfo" : {

    }
  }

  static startGame() {
    GameController.gameState.gameStarted = true
    GameController.gameState.currentLevel = 0
    GameController.gameState.lastScannedBarcode = 0
  }

  // if session data exists, loads it
  // sets gameState to loaded session data
  static loadSessionData() {
    GameController.gameState = Session.FetchSessionData()
   }

  // checks answer and updates session with gameState
  // returns true if correct, false otherwise
  static checkAnswer(barcodeId) {
    GameController.gameState.lastScannedBarcode = barcodeId
    // correct barcode for level n has id n+1
    if(GameController.gameState.lastScannedBarcode === GameController.currentLevel + 1) {
      GameController.correctAnswer()
    } else {
      GameController.wrongAnswer()
    }
    // update session data after each barcode scanned
    Session.SetSessionData(GameController.gameState)
  }

  static correctAnswer() {
    // increment level
    GameController.gameState.currentLevel += 1
    // reset attempt counter
    GameController.gameState.attemptsOnCurrentLevel = 0
    // check if game is over
    if(GameController.gameState.currentLevel > lastLevel) {
      GameController.completeGame()
      return
    }
  }

  static wrongAnswer() {
    // if this is the first wrong answer for this level,
    // give extra hint
    if(GameController.gameState.attemptsOnCurrentLevel > 0) {
      GameController.getExtraHint(GameController.gameState.currentLevel)
    }
    // increment attempts, if too many attempts, give correct answer
    GameController.gameState.attemptsOnCurrentLevel++
    if(GameController.gameState.attemptsOnCurrentLevel > maxIncorrectAttempts) {
      GameController.getCorrectAnswer()
    }
  }

  static completeGame() {
    // send to "you win" splash page
    // send email
    // maybe a button to restart the game?
  }

  static getHint(level) {
    //return GameController.gameState.gameInfo.game.GameSequence[level].Clue
    return null
  }

  static getExtraHint(level) {
    // button to opt in to show extra hint
    // Extra hint for each level
    // only given after incorrect answer
  }

  getCorrectAnswer(level) {
    // give answer if too many incorrect attempts
  }

}

export default GameController;