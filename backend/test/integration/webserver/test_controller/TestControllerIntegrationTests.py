from src.util.LogFactory import LogFactory
from src.Configuration import Configuration, CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled

import requests
import unittest


@enabled
def test_controller_integration_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL CONTROLLER TESTS")
    unittest.main(module=__name__, exit=False)

class TestControllerIntegrationTests(unittest.TestCase):

    @enabled
    def test_integration_test_controller_request(self):
      r = requests.get(f"http://localhost:{CONF_INSTANCE.FLASK_PORT_BIND}/test",
          headers={ "content-type": "application/json" }
      )
      response_data = r.json()
      LogFactory.MAIN_LOG.info(f"Test Controller response {response_data}")
      assert response_data["response"] == 'hello world'

if __name__ == "__main__":
    unittest.main()