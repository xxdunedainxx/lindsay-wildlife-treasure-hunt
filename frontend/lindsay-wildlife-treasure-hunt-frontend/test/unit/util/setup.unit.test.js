import Setup from '../../../src/src/util/Setup';
import Session from '../../../src/src/util/Session';
import Configuration from '../../../src/src/conf/Configuration';
import Logger from '../../../src/src/util/Logger';

test('Test Setup run', () => 
  {
    Setup.Run()
    expect(Logger.LEVEL).toBe(Configuration.logLevel);
  }
)