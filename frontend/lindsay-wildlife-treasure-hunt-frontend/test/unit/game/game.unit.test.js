import GameController from '../../../src/src/game/Game';
import MockData from '../../../src/src/data/MockData';

test('Test Unitialized GameState', () => 
  {
    expect(GameController.gameState.gameStarted).toBe(false);
    expect(GameController.gameState.currentLevel).toBe(null);
    expect(GameController.gameState.currentArtifactIdInSequence).toBe(null);
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
  expect(GameController.gameState.currentArtifactIdInSequence).not.toBe(null);
  expect(GameController.gameState.lastGuess).toBe(null);
  expect(GameController.gameState.attemptsOnCurrentLevel).toBe(0);
  expect(GameController.gameState.correctAnswerOnCurrentLevel).toBe(false);
  expect(GameController.gameState.gameSequence).not.toBe(null);
  expect(GameController.gameState.gameComplete).toBe(false);
});

test('Test Get Operations', () => 
  {

  }
)

test('Test checkAnswer() logic', () => 
  {   
    let cLevel = GameController.gameState.currentLevel
    let correctAnswer = GameController.getAllArtifactNames(GameController.gameState.currentArtifactIdInSequence)[0]
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


// test('Test checkAnswerNumber()', () => 
//   {
    
//   }
// )

// test('Test nextLevel() + checkAnswer()', () => 
//   {

//   }
// )

// test('Test correctAnswer() + wrongAnswer()', () => 
//   {

//   }
// )


