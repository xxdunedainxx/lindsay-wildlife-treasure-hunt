from src.util.LogFactory import LogFactory
from src.Configuration import Configuration, CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled

import requests
import unittest
import json

@enabled
def login_controller_integration_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL LOGIN INTEGRATION TESTS")
    unittest.main(module=__name__, exit=False)

class LoginControllerIntegrationTests(unittest.TestCase):

    @disabled
    def test_bad_logins(self):
      invalid_username = {
        "username": "bad",
        "password": "bad"
      }
      r = requests.post(f"http://localhost:{CONF_INSTANCE.FLASK_PORT_BIND}/login",
          headers={ "content-type": "application/json" },
          data=json.dumps(invalid_username)
      )
      response_data = r.json()

      assert response_data["message"] == 'unauthorized' and r.status_code == 401

      badreq = {
        "s": "bad",
        "s2": "bad"
      }


      r = requests.post(f"http://localhost:{CONF_INSTANCE.FLASK_PORT_BIND}/login",
          headers={ "content-type": "application/json" },
          data=json.dumps(badreq)
      )
      response_data = r.json()

      assert response_data["message"] == 'bad request' and r.status_code == 400

    @disabled
    def test_good_login(self):
      uname: str = list(CONF_INSTANCE.ADMIN_USERS.keys())[0]
      pw: str = CONF_INSTANCE.ADMIN_USERS[uname]

      valid_username = {
        "username": uname,
        "password": pw
      }
      r = requests.post(f"http://localhost:{CONF_INSTANCE.FLASK_PORT_BIND}/login",
          headers={ "content-type": "application/json" },
          data=json.dumps(valid_username)
      )
      response_data = r.json()

      assert response_data["message"] == 'authorized' and r.status_code == 200 and 'jwt' in response_data.keys()
if __name__ == "__main__":
    unittest.main()