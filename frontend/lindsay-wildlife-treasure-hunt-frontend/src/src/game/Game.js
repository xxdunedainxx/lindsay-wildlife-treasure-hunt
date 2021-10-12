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
    "currentLevel": null,
    "lastScannedBarcode": -1,
    "attemptsOnCurrentLevel": Number(0),
    "gameInfo" : {

    }
  }

  static startGame() {
    GameController.gameState.gameStarted = true
    GameController.gameState.lastScannedBarcode = 0
    GameController.gameState.currentLevel = 1
    GameController.gameState.attemptsOnCurrentLevel = 0
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

  static nextLevel() {
    // increment level
    GameController.gameState.currentLevel += 1
    // reset attempt counter
    GameController.gameState.attemptsOnCurrentLevel = 0
    // check if game is over
    // if(GameController.gameState.currentLevel > lastLevel) {
    //   GameController.completeGame()
    // }
  }

  static wrongAnswer() {
    GameController.gameState.attemptsOnCurrentLevel++
  }

  static completeGame() {
    // send to "you win" splash page
    // send email
    // maybe a button to restart the game?
  }

  static getClue(level) {
    console.log(GameController.gameState.gameInfo)
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].Clue
  }

  static getExtraHint(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].AdditionalHint
  }

  static getArtifactName(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].ArtifactName
  }

  static getArticaftText(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].CorrectMessage
  }

  static getArtifactMediaUrl(level) {
    return GameController.gameState.gameInfo.game.GameSequence[level - 1].MediaLink
  }

}

export default GameController;