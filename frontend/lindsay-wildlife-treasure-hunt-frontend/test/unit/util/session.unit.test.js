import Setup from '../../../src/src/util/Setup';
import Session from '../../../src/src/util/Session';
import Configuration from '../../../src/src/conf/Configuration';
import Logger from '../../../src/src/util/Logger';

Setup.Run()

test('Test no session init', () => 
  {
    expect(Session.CheckIfExists()).toBe(false);
  }
)

test('Test no session session ID', () => 
  {
    expect(Session.GetSessionID()).toBe('no-session-established');
  }
)

test('Test Session Init + Session Exists', () => 
  {
    var sessionTestData = {
      "test" : "test"
    }
    Session.Init()
    Session.SetSessionData(sessionTestData)
    expect(Session.CheckIfExists()).toBe(true);
  }
)


test('Test Session Get Data comparison', () => 
  {
    var sessionTestData = {
      "test" : "test"
    }
    Session.Init()
    Session.SetSessionData(sessionTestData)
    expect(Session.FetchSessionData()["test"] == sessionTestData["test"]).toBe(true);
  }
)

test('Test Randomized Session ID comparison', () => 
  {
    var sessionTestData = {
      "test" : "test"
    }
    Session.SetSessionData(sessionTestData)
    expect(Session.GetSessionID() == Session.GenerateSessionID()).toBe(false);
  }
)