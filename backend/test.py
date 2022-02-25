from src.util.LogFactory import LogFactory
from src.util.FileIO import FileIO
from src.Setup import Setup

from test.util.decorators.Toggle import TestMetrics
from test.integration.IntegrationTests import IntegrationTests
from test.unit.UnitTests import UnitTests
from test.util.TestToggles import TEST_CONF

def unit():
  if TEST_CONF.UNIT_ENABLED():
    LogFactory.MAIN_LOG.info(f"Unit Test Toggle: {TEST_CONF.UNIT_TESTING_ENABLED}")
    UnitTests.run_unit_tests()
  else:
    LogFactory.MAIN_LOG.info("UNIT TESTS DISABLED")

def integration():
  if TEST_CONF.INTEGRATION_ENABLED():
    LogFactory.MAIN_LOG.info(f"Integration Test Toggle: {TEST_CONF.INTEGRATION_TESTING_ENABLED}")
    IntegrationTests.run_integration_tests()
  else:
    LogFactory.MAIN_LOG.info("INTEGRATIONS TESTS DISABLED")


def endToend():
  if TEST_CONF.END_TO_END_TESTING_ENABLED:
    LogFactory.MAIN_LOG.info("RUNNING END TO END TESTS")
  else:
    LogFactory.MAIN_LOG.info(" END TO END TESTS DISABLED")

def test():
  try:
    LogFactory.log_level = 'DEBUG'
    FileIO.delete_file("testing.log")
    LogFactory.MAIN_LOG = LogFactory.get_logger(f"testing", stdOutOnly=False)
    Setup.init_main_app_resources()
    LogFactory.MAIN_LOG.info('====== START TEST RUNNER ======')
    unit()
    integration()
    endToend()
    LogFactory.MAIN_LOG.info('====== END TEST RUNNER ======')
    TestMetrics.report()
  except Exception as e:
    LogFactory.MAIN_LOG.error(f"!!TESTS FAILED!!")

if __name__ == "__main__":
  test()
