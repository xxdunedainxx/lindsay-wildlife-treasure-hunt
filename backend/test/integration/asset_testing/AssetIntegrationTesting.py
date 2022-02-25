from src.util.LogFactory import LogFactory
from src.Configuration import Configuration, CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled

import requests
import unittest


@enabled
def asset_availability_testing():

    LogFactory.MAIN_LOG.info(f"RUNNING ASSET AVAILABILITY TESTS")
    unittest.main(module=__name__, exit=False)

class AssetAvailabilityIntegrationTests(unittest.TestCase):

    @enabled
    def test_asset_availability(self):
      LogFactory.MAIN_LOG.info('Grabbing Scavenger Hunt DB via curl..')
      r = requests.get(f"http://localhost:{CONF_INSTANCE.FLASK_PORT_BIND}/scavenger_hunt",
          headers={ "content-type": "application/json" }
      )
      response_data = r.json()
      LogFactory.MAIN_LOG.info(f"ScavengerHunt Controller response {response_data}")
      for db_item in response_data["game"]["GameSequence"]:
        LogFactory.MAIN_LOG.info(f"Iterating db_item: {db_item}")
        mediaLink = f"http://localhost:{CONF_INSTANCE.FLASK_PORT_BIND}/{db_item['MediaLink']}"
        LogFactory.MAIN_LOG.info(f"Testing media link: {mediaLink}")
        r = requests.get(mediaLink)

        # Ensure each link is available
        assert r.status_code == 200


if __name__ == "__main__":
    unittest.main()