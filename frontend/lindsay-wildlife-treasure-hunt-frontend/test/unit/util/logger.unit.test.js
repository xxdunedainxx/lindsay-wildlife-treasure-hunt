import Setup from '../../../src/src/util/Setup';
import Session from '../../../src/src/util/Session';
import Configuration from '../../../src/src/conf/Configuration';
import Logger from '../../../src/src/util/Logger';

test('Test Log Configuration', () => 
  {
    Configuration.logLevel = "DEBUG"
    Logger.Init()
    expect(Logger.LEVEL).toBe("DEBUG");
  }
)

test('Test Remote Logging Functions', () => 
  {
    Logger.RemoteLog = jest.fn();
    Configuration.logLevel = "INFO"
    Logger.Init()
    Logger.info("Test", true)
    expect(Logger.RemoteLog).toHaveBeenCalled();
  }
)

test('Test Logging Hierarchy', () => 
  {
    Logger.LEVEL = "ERROR"
    console.log = jest.fn();
    Logger.RemoteLog = jest.fn();

    Logger.debug("Test")
    expect(console.log).not.toHaveBeenCalled();
    expect(Logger.RemoteLog).not.toHaveBeenCalled();

    Logger.info("Test")
    expect(console.log).not.toHaveBeenCalled();
    expect(Logger.RemoteLog).not.toHaveBeenCalled();

    Logger.error("Test")
    expect(console.log).toHaveBeenCalled();
    expect(Logger.RemoteLog).not.toHaveBeenCalled();
  }
)


test('Test Logging Functions', () => 
  {
    Logger.Log = jest.fn();
    Logger.RemoteLog = jest.fn();
    Configuration.logLevel = "DEBUG"
    Logger.Init()
    Logger.info("Test")
    expect(Logger.Log).toHaveBeenCalled();
    expect(Logger.RemoteLog).not.toHaveBeenCalled();
  }
)

