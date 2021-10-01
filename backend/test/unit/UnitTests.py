from src.util.LogFactory import LogFactory
from test.unit.qr.QRCodeTests import qr_code_tests
from test.unit.queues.MailerQUnitTests import mail_q_unit_tests
from test.unit.mail.MailControllerTests import mail_controller_tests

class UnitTests:

  @staticmethod
  def run_unit_tests():
    LogFactory.MAIN_LOG.info('Running Unit tests!')
    qr_code_tests()
    mail_q_unit_tests()
    mail_controller_tests()