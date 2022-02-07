from src.util.LogFactory import LogFactory
from src.util.FileIO import FileIO
from src.util.Toggle import TestMetrics
from src.selenium_ui_tests import selenium_ui_tests
from src.selenium_game_tests import selenium_game_tests
from src.util.TestConf import TEST_CONF

def selenium_tests():
  LogFactory.MAIN_LOG.info('Running Selenium UI Tests')
  selenium_ui_tests(TEST_CONF.TEST_OS, TEST_CONF.BROWSER, TEST_CONF.BASE_URL, TEST_CONF.PAGE_TITLE)
  selenium_game_tests(TEST_CONF.TEST_OS, TEST_CONF.BROWSER, TEST_CONF.BASE_URL, TEST_CONF.PAGE_TITLE)

def test():
  try:
    LogFactory.log_level = 'DEBUG'
    FileIO.delete_file("testing.log")
    LogFactory.MAIN_LOG = LogFactory.get_logger(f"testing", stdOutOnly=False)
    LogFactory.MAIN_LOG.info('====== START TEST RUNNER ======')
    selenium_tests()
    LogFactory.MAIN_LOG.info('====== END TEST RUNNER ======')
    TestMetrics.report()
  except Exception as e:
    LogFactory.MAIN_LOG.error(f"!!TESTS FAILED!!")

if __name__ == "__main__":
  test()
