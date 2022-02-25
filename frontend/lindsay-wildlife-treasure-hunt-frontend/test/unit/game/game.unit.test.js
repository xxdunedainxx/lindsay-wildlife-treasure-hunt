import GameController from '../../../src/src/game/Game';
import MockData from '../../../src/src/data/MockData';

test('Test Unitialized GameState', () => 
  {
    expect(GameController.gameState.gameStarted).toBe(false);
    expect(GameController.gameState.currentLevel).toBe(null);
    expect(GameController.gameState.currentArtifactIdxInSequence).toBe(null);
    expect(GameController.gameState.lastGuess).toBe(null);
    expect(GameController.gameState.attemptsOnCurrentLevel).toBe(0);
    expect(GameController.gameState.correctAnswerOnCurrentLevel).toBe(false);
    expect(GameController.gameState.gameSequence).toBe(null);
    expect(GameController.gameState.gameComplete).toBe(false);
    expect(JSON.stringify(GameController.gameState.gameInfo)).toBe('{}');
  }
)


test('Test startGame()', async () => {
  GameController.gameState.gameInfo = MockData.exampleMockedDataOne
  GameController.Init()
  await expect(GameController.startGame()).resolves.toBe(undefined)
  expect(GameController.gameState.gameStarted).toBe(true);
  expect(GameController.gameState.currentLevel).not.toBe(null);
  expect(GameController.gameState.currentArtifactIdxInSequence).not.toBe(null);
  expect(GameController.gameState.lastGuess).toBe(null);
  expect(GameController.gameState.attemptsOnCurrentLevel).toBe(0);
  expect(GameController.gameState.correctAnswerOnCurrentLevel).toBe(false);
  expect(GameController.gameState.gameSequence).not.toBe(null);
  expect(GameController.gameState.gameComplete).toBe(false);
});

test('Test Get Operations', () => 
  { 
    let currentID = GameController.gameState.currentArtifactIdxInSequence
    expect(GameController.getClue(currentID)).toBe(GameController.gameState.gameInfo.game.GameSequence[currentID].Clue);
    expect(GameController.getArtifactId(currentID)).toBe(GameController.gameState.gameInfo.game.GameSequence[currentID].ArtifactId);
    expect(GameController.getExtraHint(currentID)).toBe(GameController.gameState.gameInfo.game.GameSequence[currentID].AdditionalHint);
    expect(GameController.getArtifactName(currentID)).toBe(GameController.gameState.gameInfo.game.GameSequence[currentID].ArtifactName[0]);
    expect(GameController.getAllArtifactNames(currentID)).toBe(GameController.gameState.gameInfo.game.GameSequence[currentID].ArtifactName);
    expect(GameController.getArtifactText(currentID)).toBe(GameController.gameState.gameInfo.game.GameSequence[currentID].CorrectMessage);
    expect(GameController.getArtifactMediaUrl(currentID)).toBe(GameController.gameState.gameInfo.game.GameSequence[currentID].MediaLink);
    expect(GameController.getArtifactPhotoCredit(currentID)).toBe(GameController.gameState.gameInfo.game.GameSequence[currentID].Credit);
    expect(GameController.getCorrectAnswerOnCurrentLevel(currentID)).toBe(GameController.gameState.correctAnswerOnCurrentLevel);
  }
)

test('Test checkAnswer() logic', () => 
  {   
    window.alert = jest.fn();
    let cLevel = GameController.gameState.currentLevel
    let correctAnswer = GameController.getAllArtifactNames(GameController.gameState.currentArtifactIdxInSequence)[0]
    GameController.checkAnswer('WRONG ANSWER')
    expect(GameController.gameState.attemptsOnCurrentLevel).toBe(1);
    expect(GameController.gameState.correctAnswerOnCurrentLevel).toBe(false);
    expect(GameController.gameState.lastGuess).toBe('WRONG ANSWER');
    expect(GameController.gameState.currentLevel).toBe(cLevel);

    GameController.checkAnswer(correctAnswer)
    expect(GameController.gameState.correctAnswerOnCurrentLevel).toBe(true);
    expect(GameController.gameState.lastGuess).toBe(correctAnswer);

    GameController.nextLevel()
    expect(GameController.gameState.attemptsOnCurrentLevel).toBe(0);
    expect(GameController.gameState.currentLevel).toBe(cLevel+1);
  }
)




test('Test nextLevel() upon completion of game', () => 
  {
    GameController.gameState.currentLevel = GameController.getNumberOfArtifacts() + 1
    GameController.nextLevel()
    expect(GameController.gameState.gameComplete).toBe(true)
  }
)

test('Test correctAnswer() + wrongAnswer()', () => 
  {
    window.alert = jest.fn();
    let attempts = GameController.gameState.attemptsOnCurrentLevel+1
    GameController.wrongAnswer()
    expect(GameController.gameState.attemptsOnCurrentLevel).toBe(attempts)
    expect(GameController.gameState.correctAnswerOnCurrentLevel).toBe(false)

    GameController.correctAnswer()
    expect(GameController.gameState.correctAnswerOnCurrentLevel).toBe(true)
  }
)


test('Test checkAnswerNumber()', () => 
  {
    let correctID = GameController.getArtifactId(GameController.gameState.currentArtifactIdxInSequence)
    let wrongID = 9999
    GameController.correctAnswer = jest.fn();
    GameController.wrongAnswer = jest.fn();
    GameController.saveState = jest.fn();

    GameController.checkAnswerNumber(wrongID)
    expect(GameController.wrongAnswer).toHaveBeenCalled();
    expect(GameController.saveState).toHaveBeenCalled();


    GameController.checkAnswerNumber(correctID)
    expect(GameController.correctAnswer).toHaveBeenCalled();
    expect(GameController.saveState).toHaveBeenCalled();
  }
)