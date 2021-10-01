/*
  GameController
*/

import Session from "../util/Session";

// placeholder values
const lastLevel = 10
const maxIncorrectAttempts = 5

export class GameController {

  static gameState = {
    // -1: pre-startGame state
    "currentLevel": -1,
    "lastScannedBarcode": -1,
    "attemptsOnCurrentLevel": 0
  }

  startGame() {
    gameState.currentLevel = 0
    gameState.lastScannedBarcode = 0
    Session.Init()
    Session.placeHolderData.gameStarted = true
  }

  loadSessionData() {
    Session.FetchSessionData()
  }

  checkAnswer() {
    // correct barcode for level n has id n+1
    if(lastScannedBarcode = currentLevel + 1) {
      this.correctAnswer()
    } else {
      this.wrongAnswer()
    }
  }

  correctAnswer() {
    // increment level
    gameState.currentLevel += 1
    // check if game is over
    if(currentLevel > lastLevel) {
      this.completeGame()
      return
    }
    // reset attempt counter
    gameState.attemptsOnCurrentLevel = 0
    // show hint for next level
    getHint(level)
  }

  wrongAnswer() {
    // if this is the first wrong answer for this level,
    // give extra hint
    if(gameState.attemptsOnCurrentLevel > 0) {
      getExtraHint(gameState.currentLevel)
    }
    // increment attempts, if too many attempts, give correct answer
    gameState.attemptsOnCurrentLevel++
    if(gameState.attemptsOnCurrentLevel > maxIncorrectAttempts) {
      getCorrectAnswer()
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
    // Extra hint for each level
    // only given after incorrect answer
  }

  getCorrectAnswer(level) {
    // give answer if too many incorrect attempts
  }

}