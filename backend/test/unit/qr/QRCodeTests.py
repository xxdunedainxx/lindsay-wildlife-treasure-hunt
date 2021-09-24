
from src.util.LogFactory import LogFactory
from src.QRCode.QRCodeGenerator import QRCodeGenerator

from test.util.decorators.Toggle import enabled, disabled

import unittest

@enabled
def qr_code_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL QR CODE TESTS")
    unittest.main(module=__name__, exit=False)

class QRCodeTests(unittest.TestCase):
    @enabled
    def test_generate_qr_code(self):
      LogFactory.MAIN_LOG.info('Executing test \'test_generate_qr_code\'')
      QRCodeGenerator.generate_qr_code_file('google.com', 'test_file.png')

if __name__ == "__main__":
    unittest.main()