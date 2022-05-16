from src.sec.Authenticator import Authenticator
from src.Configuration import CONF_INSTANCE
from src.util.LogFactory import LogFactory

from test.util.decorators.Toggle import enabled, disabled

import unittest

@enabled
def authenticator_unit_tests():
    LogFactory.MAIN_LOG.info(f"RUNNING authenticator tests")
    unittest.main(module=__name__, exit=False)

class AuthenticatorUnitTesting(unittest.TestCase):

    @enabled
    def test_basic_auth_tests(self):
      CONF_INSTANCE.ADMIN_USERS = {
        "admin" : "something"
      }

      assert Authenticator.basic_user_auth(
        "admin","something"
      ) == True

      assert Authenticator.basic_user_auth(
        "admin","somethingelse"
      ) == False


if __name__ == "__main__":
    unittest.main()
