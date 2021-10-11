from src.util.LogFactory import LogFactory
import requests
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil, AppHealthStatus

from test.util.decorators.Toggle import enabled, disabled

import unittest
from mock import patch, MagicMock, Mock


@enabled
def app_health_controller_integration_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL CONTROLLER TESTS")
    unittest.main(module=__name__, exit=False)

class AppHealthMonitoringControllerIntegrationTests(unittest.TestCase):

    @enabled
    def test_integration_app_health_controller_test(self):
      r = requests.get("http://localhost/health",
                       headers={"content-type": "application/json"}
                       )
      LogFactory.MAIN_LOG.info(f"App Health controller response {r.json()}")
      assert r.status_code == 200


    @enabled
    def test_integration_app_health_controller_dependency_test(self):
      r = requests.get("http://localhost/dependencies",
                       headers={"content-type": "application/json"}
                       )
      LogFactory.MAIN_LOG.info(f"App Health controller response {r.json()}")
      assert r.status_code == 200

AppHealthStatusUtil.get_enabled_services()
if __name__ == "__main__":
    unittest.main()