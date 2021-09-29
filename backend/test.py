from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace
from src.App import App

from test.util.decorators.Toggle import TestMetrics
from test.integration.IntegrationTests import IntegrationTests
from test.unit.UnitTests import UnitTests

def test():
  try:
    LogFactory.log_level = 'DEBUG'
    App.init_main_app_resources()
    LogFactory.MAIN_LOG.info('====== START TEST RUNNER ======')
    UnitTests.run_unit_tests()
    IntegrationTests.run_integration_tests()
    LogFactory.MAIN_LOG.info('====== END TEST RUNNER ======')
    TestMetrics.report()
  except Exception as e:
    LogFactory.MAIN_LOG.error(f"TESTS FAILED {errorStackTrace(e)}")

test()