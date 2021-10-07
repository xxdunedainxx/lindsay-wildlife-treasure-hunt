from src.util.validators.EmailValidator import EmailValidator
from src.util.LogFactory import LogFactory

from test.util.decorators.Toggle import enabled, disabled

import redis
import unittest

GOOD_EMAILS: [str] = [
  "someone@aol.com",
  "someelse@gmail.com",
  "somethingfsjkldajsgadhgladslfhdsafadsf@hotmail.com"
]

BAD_EMAILS: [str] = [
  "fdasfdasfas",
  "@fad@@@fadsfsadfasd",
  "@@@@@@",
  ".com"
]

@enabled
def email_validation_tests():
    LogFactory.MAIN_LOG.info(f"RUNNING email validation tests")
    unittest.main(module=__name__, exit=False)

class EmailValidationUnitTests(unittest.TestCase):

    @enabled
    def test_good_emails(self):
        for email in GOOD_EMAILS:
          LogFactory.MAIN_LOG.info(f"Testing email {email}")
          assert EmailValidator.is_valid(email) == True

    @enabled
    def test_bad_emails(self):
      for email in BAD_EMAILS:
        LogFactory.MAIN_LOG.info(f"Testing email {email}")
        assert EmailValidator.is_valid(email) == False


if __name__ == "__main__":
    unittest.main()