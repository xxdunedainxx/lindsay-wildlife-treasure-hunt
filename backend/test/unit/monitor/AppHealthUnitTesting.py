from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil, AppHealthStatus
from src.util.LogFactory import LogFactory

from test.util.decorators.Toggle import enabled, disabled
import unittest


@enabled
def app_health_util_unit_testing():
    LogFactory.MAIN_LOG.info(f"RUNNING email validation tests")
    unittest.main(module=__name__, exit=False)

class AppHealthUtilUnitTesting(unittest.TestCase):

    @enabled
    def test_get_health(self):
      pass

if __name__ == "__main__":
    unittest.main()