from src.util.LogFactory import LogFactory
from src.Configuration import Configuration, CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled

import requests
import unittest


@enabled
def scavenger_hunt_controller_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL SCAVENGER HUNT CONTROLLER TESTS")
    unittest.main(module=__name__, exit=False)

class ScavengerHuntControllerIntegrationTests(unittest.TestCase):

    @enabled
    def test_integration_scavenger_hunt_controller_request(self):
      r = requests.get(f"http://localhost:{CONF_INSTANCE.FLASK_PORT_BIND}/scavenger_hunt",
          headers={ "content-type": "application/json" }
      )
      response_data = r.json()
      LogFactory.MAIN_LOG.info(f"ScavengerHunt Controller response {response_data}")
      assert response_data["Name"] == 'Lindsay Wildlife treasure hunt'

if __name__ == "__main__":
    unittest.main()