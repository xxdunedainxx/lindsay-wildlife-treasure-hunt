/*
  GameController
*/

import Logger from '../util/Logger';
import Session from "../util/Session";

// placeholder values
const lastLevel = 10
const maxIncorrectAttempts = 3

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
    "currentArtifactIdInSequence" : null,
    "lastGuess" : null,
    "attemptsOnCurrentLevel": 0,
    "correctAnswerOnCurrentLevel": false,
    "gameSequence": null,
    "gameInfo" : {

    }
  }

  static startGame() {
    GameController.gameState.gameStarted = true;
    GameController.gameState.lastGuess = null;
    GameController.gameState.currentLevel = 1;
    GameController.gameState.attemptsOnCurrentLevel = 0;
    GameController.gameState.correctAnswerOnCurrentLevel = false;
    GameController.generateGameSequence();
    GameController.gameState.currentArtifactIdInSequence = GameController.gameState.gameSequence[GameController.gameState.currentLevel - 1];
    GameController.saveState();
  }

  static resetGame() {
    GameController.gameState.gameStarted = false;
    GameController.gameState.currentLevel = null;
    GameController.gameState.lastGuess = null;
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

  // takes a lower case arg
  // checks answer and updates session with gameState
  // returns true if correct, false otherwise
  static checkAnswer(answer) {
    const correctAnswers = GameController.getAllArtifactNames(GameController.gameState.currentArtifactIdInSequence);
    for(let i = 0; i < correctAnswers.length; i++) {
      if(answer == correctAnswers[i].toLowerCase()) {
        GameController.correctAnswer();
        GameController.saveState();
        return
      }
    }
    // if not in correctAnswers, the answer is wrong
    GameController.wrongAnswer();
    GameController.saveState();
  }

  static nextLevel() {
    // if game is not over
    if(GameController.gameState.currentLevel < GameController.getNumberOfArtifacts()) {
      GameController.gameState.currentLevel += 1;
      GameController.gameState.currentArtifactIdInSequence = GameController.gameState.gameSequence[GameController.gameState.currentLevel - 1];
      // reset attempt counter
      GameController.gameState.attemptsOnCurrentLevel = 0;
      GameController.gameState.correctAnswerOnCurrentLevel = false;
      GameController.saveState();
    }
    // else complete game
    else {

    }
  }

  static correctAnswer() {
    GameController.gameState.correctAnswerOnCurrentLevel = true;
  }

  static wrongAnswer() {
    GameController.gameState.attemptsOnCurrentLevel++;
  }

  static getNumberOfArtifacts() {
    return GameController.gameState.gameInfo.game.GameSequence.length;
  }

  static generateGameSequence() {
    const n = GameController.getNumberOfArtifacts();
    let seq = Array(n).fill().map((x,i)=>i);
    GameController.gameState.gameSequence = GameController.shuffle(seq);
  }

  static shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  static completeGame() {
    // send to "you win" splash page
    // send email
    // maybe a button to restart the game?
  }

  static getClue(artifactId) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactId].Clue;
  }

  static getExtraHint(artifactId) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactId].AdditionalHint;
  }

  static getArtifactName(artifactId) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactId].ArtifactName[0];
  }

  static getAllArtifactNames(artifactId) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactId].ArtifactName;
  }

  static getArtifactText(artifactId) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactId].CorrectMessage;
  }

  static getArtifactMediaUrl(artifactId) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactId].MediaLink;
  }

  static getCorrectAnswerOnCurrentLevel() {
    return GameController.gameState.correctAnswerOnCurrentLevel;
  }

}

export default GameController;