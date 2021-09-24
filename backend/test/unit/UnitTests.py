from src.util.LogFactory import LogFactory
from test.unit.qr.QRCodeTests import qr_code_tests

class UnitTests:

  @staticmethod
  def run_unit_tests():
    LogFactory.MAIN_LOG.info('Running Unit tests!')
    qr_code_tests()