from src.util.LogFactory import LogFactory
from test.unit.qr.QRCodeTests import qr_code_tests
from test.unit.queues.MailerQUnitTests import mail_q_unit_tests
from test.unit.queues.RedisQueueCoreOperationUnitTests import redis_queue_unit_tests
from test.unit.util.EmailValidationUnitTesting import email_validation_tests
from test.unit.monitor.AppHealthUnitTesting import app_health_util_unit_testing
from test.unit.db.DBTesting import db_unit_testing

class UnitTests:

  @staticmethod
  def run_unit_tests():
    LogFactory.MAIN_LOG.info('Running Unit tests!')
    qr_code_tests()
    redis_queue_unit_tests()
    mail_q_unit_tests()
    email_validation_tests()
    app_health_util_unit_testing()
    db_unit_testing()