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
    Session.Init()
    loadSessionData()
  }

  static gameState = {
    // -1: pre-startGame state
    "gameStarted" : false,
    "currentLevel": -1,
    "lastScannedBarcode": -1,
    "attemptsOnCurrentLevel": 0
  }

  startGame() {
    gameState.gameStarted = true
    gameState.currentLevel = 0
    gameState.lastScannedBarcode = 0
    this.getHint(0)
  }

  // if session data exists, loads it
  // sets gameState to loaded session data
  loadSessionData() {
    if(Session.CheckIfExists()) {
      this.gameState = Session.FetchSessionData()
    }
    else {
      Session.FetchSessionData()
    }
  }

  // checks answer and updates session with gameState
  checkAnswer() {
    // correct barcode for level n has id n+1
    if(lastScannedBarcode === currentLevel + 1) {
      this.correctAnswer()
    } else {
      this.wrongAnswer()
    }
    // update session data after each barcode scanned
    Session.SetSessionData(gameState)
  }

  correctAnswer() {
    // increment level
    gameState.currentLevel += 1
    // reset attempt counter
    gameState.attemptsOnCurrentLevel = 0
    // check if game is over
    if(gameState.currentLevel > lastLevel) {
      this.completeGame()
      return
    }
    // show hint for next level
    this.getHint(gameState.currentLevel)
  }

  wrongAnswer() {
    // if this is the first wrong answer for this level,
    // give extra hint
    if(gameState.attemptsOnCurrentLevel > 0) {
      this.getExtraHint(gameState.currentLevel)
    }
    // increment attempts, if too many attempts, give correct answer
    gameState.attemptsOnCurrentLevel++
    if(gameState.attemptsOnCurrentLevel > maxIncorrectAttempts) {
      this.getCorrectAnswer()
    }
  }

  completeGame() {
    // send to "you win" splash page
    // send email
    // maybe a button to restart the game?
  }

  getHint(level) {
    // base clue to find next animal
    // given after correct answer
  }

  getExtraHint(level) {
    // button to opt in to show extra hint
    // Extra hint for each level
    // only given after incorrect answer
  }

  getCorrectAnswer(level) {
    // give answer if too many incorrect attempts
  }

}

export default GameController;