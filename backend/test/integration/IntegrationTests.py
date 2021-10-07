from src.util.LogFactory import LogFactory
from test.integration.redis.RedisQueueOperationTests import redis_queue_integration_tests
from test.integration.webserver.mail_controller.MailControllerIntegrationTests import mail_controller_tests
from test.integration.threading.WorkerIntegrationTests import threading_integration_tests

class IntegrationTests:

  @staticmethod
  def run_integration_tests():
    LogFactory.MAIN_LOG.info('Running integration tests!')
    redis_queue_integration_tests()
    mail_controller_tests()
    threading_integration_tests()