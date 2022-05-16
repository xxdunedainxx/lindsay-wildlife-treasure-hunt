from src.sec.JwtAuth import JwtAuth
from src.Configuration import CONF_INSTANCE
from src.util.LogFactory import LogFactory

from test.util.decorators.Toggle import enabled, disabled

import unittest

@enabled
def jwt_unit_tests():
    LogFactory.MAIN_LOG.info(f"RUNNING jwt tests")
    unittest.main(module=__name__, exit=False)

class JwtUnitTesting(unittest.TestCase):

    @enabled
    def test_jwt_setters(self):
      seed_key: str = "somerandomkey"
      JwtAuth.set_jwt_secret_key("somerandomkey")
      assert JwtAuth.jwt_secret_key == seed_key

      JwtAuth.set_jwt_expiration_policy(
        1,
        100
      )

      assert JwtAuth.exp_day_policy == 1 and JwtAuth.exp_seconds_policy == 100

    @enabled
    def test_generate_jwt_token(self):
      tok = JwtAuth.encode_auth_token()

      assert type(tok) == str


    @enabled
    def test_generate_and_decode_jwt_token(self):
      tok = JwtAuth.encode_auth_token()

      decoded = JwtAuth.decode_auth_token(tok)

      assert decoded.info['type'] == 'client'



if __name__ == "__main__":
    unittest.main()
