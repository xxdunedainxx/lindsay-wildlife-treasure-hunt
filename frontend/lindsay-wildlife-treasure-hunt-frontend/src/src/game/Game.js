/*
  GameController
*/

import Logger from '../util/Logger';
import Session from "../util/Session";

// Const values
const maxIncorrectAttempts = 3

export class GameController {
  static correctAnswerMessages = [
    "Nailed it!",
    "Nice job!",
    "You got it!",
    "Another one in the bag!"
  ]

  static wrongAnswerMessages = [
    "Not quite, let's try again.",
    "Hmm, let's give it another try.",
    "That wasn't it, but I know you can do this!"
  ]

  static gameSequenceSize = 7

  // if session data exists, loads it
  static Init(){
    Logger.info('init game controller', true)

    console.log(GameController.gameState)
    console.log(Session.FetchSessionData())
    GameController.loadSessionData();
    if(GameController.gameState.gameInfo.game.GameSequence.length < GameController.gameSequenceSize) {
      GameController.gameSequenceSize = GameController.gameState.gameInfo.game.GameSequence.length
    }
  }

  static gameState = {
    "gameStarted" : false,
    "currentLevel": null,
    "currentArtifactIdxInSequence" : null,
    "lastGuess" : null,
    "attemptsOnCurrentLevel": 0,
    "correctAnswerOnCurrentLevel": false,
    "gameSequence": null,
    "gameComplete": false,
    "gameInfo" : {

    }
  }

  static getRandomElement(arr){
    var random = arr[Math.floor(Math.random()*arr.length)]
    return random
  }


  static async startGame() {
    Logger.info("STARTING GAME")
    GameController.gameState.gameStarted = true;
    GameController.gameState.lastGuess = null;
    GameController.gameState.currentLevel = 1;
    GameController.gameState.attemptsOnCurrentLevel = 0;
    GameController.gameState.correctAnswerOnCurrentLevel = false;
    GameController.generateGameSequence();
    GameController.gameState.currentArtifactIdxInSequence = GameController.gameState.gameSequence[GameController.gameState.currentLevel - 1];
    GameController.saveState();
  }

  static resetGame() {
    //GameController.gameState.gameStarted = false;
    //GameController.gameState.currentLevel = null;
    //GameController.gameState.lastGuess = null;
    //GameController.gameState.attemptsOnCurrentLevel = 0;
    //GameController.gameState.correctAnswerOnCurrentLevel = false;
    GameController.startGame();
    GameController.saveState();
  }

  // if session data exists, loads it
  // sets gameState to loaded session data
  static async loadSessionData() {
    if(Session.CheckIfExists()){
      GameController.gameState = Session.FetchSessionData()
    } else {
      // First time load, no session, must explicitly set from existing gamestate
      Session.SetSessionData(GameController.gameState)
    }
   }

  static saveState() {
    Session.SetSessionData(GameController.gameState);
  }

  // takes a lower case arg
  // checks answer and updates session with gameState
  // returns true if correct, false otherwise
  static checkAnswer(answer) {
    const correctAnswers = GameController.getAllArtifactNames(GameController.gameState.currentArtifactIdxInSequence);
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

  static checkAnswerNumber(answer) {
    const correctNumber = this.getArtifactId(GameController.gameState.currentArtifactIdxInSequence);
    if(answer == correctNumber) {
      GameController.correctAnswer()
      GameController.saveState()
      return
    }
    GameController.wrongAnswer();
    GameController.saveState();
  }

  static nextLevel() {
    // if game is not over
    if(GameController.gameState.currentLevel < GameController.gameSequenceSize) {
      GameController.gameState.currentLevel += 1;
      GameController.gameState.currentArtifactIdxInSequence = GameController.gameState.gameSequence[GameController.gameState.currentLevel - 1];
      // reset attempt counter
      GameController.gameState.attemptsOnCurrentLevel = 0;
      GameController.gameState.correctAnswerOnCurrentLevel = false;
      GameController.saveState();
    }
    // else complete game
    else {
      GameController.gameState.gameComplete = true;
    }
  }

  static correctAnswer() {
    GameController.gameState.correctAnswerOnCurrentLevel = true;
    alert(GameController.getRandomElement(GameController.correctAnswerMessages))
  }

  static wrongAnswer() {
    GameController.gameState.attemptsOnCurrentLevel++;
    alert(GameController.getRandomElement(GameController.wrongAnswerMessages))
  }

  static getNumberOfArtifacts() {
    return GameController.gameState.gameInfo.game.GameSequence.length;
  }

  static generateGameSequence() {
    Logger.info("Generating game sequence...")
    const n = GameController.getNumberOfArtifacts();
    let seq = Array(n).fill().map((x,i)=>i);
    GameController.gameState.gameSequence = GameController.shuffle(seq);
    Logger.info(`Game Sequence Generated: ${JSON.stringify(GameController.gameState.gameSequence)}`)
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
    
    // Reduce size of gameplay to a desired game sequence size
    return array.slice(0,GameController.gameSequenceSize);
  }

  static completeGame() {
    // send to "you win" splash page
    // send email
    // maybe a button to restart the game?
  }

  static getClue(artifactIdx) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactIdx].Clue;
  }

  static getArtifactId(artifactIdx) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactIdx].ArtifactId
  }

  static getExtraHint(artifactIdx) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactIdx].AdditionalHint;
  }

  static getArtifactName(artifactIdx) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactIdx].ArtifactName[0];
  }

  static getAllArtifactNames(artifactIdx) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactIdx].ArtifactName;
  }

  static getArtifactText(artifactIdx) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactIdx].CorrectMessage;
  }

  static getArtifactMediaUrl(artifactIdx) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactIdx].MediaLink;
  }

  static getArtifactPhotoCredit(artifactIdx) {
    return GameController.gameState.gameInfo.game.GameSequence[artifactIdx].Credit;
  }

  static getCorrectAnswerOnCurrentLevel() {
    return GameController.gameState.correctAnswerOnCurrentLevel;
  }

}

export default GameController;