from src.util.LogFactory import LogFactory
from test.integration.redis.RedisQueueOperationTests import redis_queue_integration_tests
from test.integration.webserver.mail_controller.MailControllerIntegrationTests import mail_controller_tests
from test.integration.webserver.test_controller.TestControllerIntegrationTests import test_controller_integration_tests
from test.integration.threading.WorkerIntegrationTests import threading_integration_tests
from test.integration.webserver.monitoring.AppHealthMonitorIntegrationTests import app_health_controller_integration_tests
from test.integration.webserver.scavenger_hunt.ScavengerHuntControllerIntegrationTests import scavenger_hunt_controller_tests
from test.integration.asset_testing.AssetIntegrationTesting import asset_availability_testing
from test.integration.webserver.login.LoginIntegrationTests import login_controller_integration_tests

class IntegrationTests:

  @staticmethod
  def run_integration_tests():
    LogFactory.MAIN_LOG.info('Running integration tests!')
    redis_queue_integration_tests()
    mail_controller_tests()
    app_health_controller_integration_tests()
    test_controller_integration_tests()
    threading_integration_tests()
    scavenger_hunt_controller_tests()
    asset_availability_testing()
    login_controller_integration_tests()