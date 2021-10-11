from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil, AppHealthStatus
from src.util.LogFactory import LogFactory
from src.Services import ServiceNames
from src.Configuration import CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled

from mock import patch, MagicMock, Mock
import unittest


@enabled
def app_health_util_unit_testing():
    LogFactory.MAIN_LOG.info(f"RUNNING email validation tests")
    unittest.main(module=__name__, exit=False)

class AppHealthUtilUnitTesting(unittest.TestCase):

    @enabled
    @patch('src.WebServer.controllers.monitor.AppHealthUtil.AppHealthStatusUtil.check_service_pids', MagicMock(return_value=True))
    def test_get_health_healthy(self):
      service: str = "testService"
      AppHealthStatusUtil.write_status(service, status=AppHealthStatus.HEALTHY)

      assert AppHealthStatusUtil.is_healthy(service) == True
      assert AppHealthStatusUtil.get_status(service) == AppHealthStatus.HEALTHY

    @enabled
    def test_get_health_missing(self):
      service: str = "testService"
      AppHealthStatusUtil.write_status(service, status=AppHealthStatus.HEALTHY)

      assert AppHealthStatusUtil.is_healthy(service) == False
      assert AppHealthStatusUtil.get_status(service) == AppHealthStatus.MISSING

    @enabled
    @patch('src.WebServer.controllers.monitor.AppHealthUtil.AppHealthStatusUtil.check_service_pids',
           MagicMock(return_value=True))
    def test_get_health_unhealthy(self):
      service: str = "testService"
      AppHealthStatusUtil.write_status(service, status=AppHealthStatus.UNHEALTHY)

      assert AppHealthStatusUtil.is_healthy(service) == False
      assert AppHealthStatusUtil.get_status(service) == AppHealthStatus.UNHEALTHY

    @enabled
    @patch('src.WebServer.controllers.monitor.AppHealthUtil.AppHealthStatusUtil.check_service_pids',
           MagicMock(return_value=True))
    def test_get_health_busy(self):
      service: str = "testService"
      AppHealthStatusUtil.write_status(service, status=AppHealthStatus.BUSY)

      assert AppHealthStatusUtil.is_healthy(service) == False
      assert AppHealthStatusUtil.get_status(service) == AppHealthStatus.BUSY

    @enabled
    @patch('src.WebServer.controllers.monitor.AppHealthUtil.AppHealthStatusUtil.check_service_pids',
           MagicMock(return_value=True))
    def test_get_health_fatal(self):
      service: str = "testService"
      AppHealthStatusUtil.write_status(service, status=AppHealthStatus.FATAL)

      assert AppHealthStatusUtil.is_healthy(service) == False
      assert AppHealthStatusUtil.get_status(service) == AppHealthStatus.FATAL

    @enabled
    @patch('src.WebServer.controllers.monitor.AppHealthUtil.AppHealthStatusUtil.check_service_pids',
           MagicMock(return_value=True))
    @patch('src.Configuration.CONF_INSTANCE.SERVICE_TOGGLES',
           MagicMock(
             return_value={
              ServiceNames.mail : True,
              ServiceNames.jsLogs : True,
              ServiceNames.apiServer : True
             }
           )
    )
    def test_all_services_enabled(self):
      service: str = "testService"
      AppHealthStatusUtil.lay_down_status_files()

      for service in AppHealthStatusUtil.get_enabled_services():
        assert AppHealthStatusUtil.get_status(service) == AppHealthStatus.UNKNOWN
        assert AppHealthStatusUtil.is_healthy(service) == False

    @enabled
    @patch('src.Configuration.CONF_INSTANCE.SERVICE_TOGGLES',
           MagicMock(
             return_value={
               ServiceNames.mail: False,
               ServiceNames.jsLogs: False,
               ServiceNames.apiServer: False
             }
           )
           )
    def test_all_services_disabled(self):
      LogFactory.MAIN_LOG.info(f"enabled services:: {AppHealthStatusUtil.get_enabled_services()}")
      assert len(AppHealthStatusUtil.get_enabled_services()) == 0


if __name__ == "__main__":
    unittest.main()