from src.Singletons import Singletons
from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE
import requests
import json

from test.util.decorators.Toggle import enabled, disabled

import unittest

@enabled
def mail_controller_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL CONTROLLER TESTS")
    unittest.main(module=__name__, exit=False)

class MailControllerTests(unittest.TestCase):

    @enabled
    def test_sending_email_request(self):
      MailQ = Singletons.mailQ
      # get size before adding email
      q_size = MailQ.q_size()
      dictionary_object = {"email": "test@google.com"}
      r = requests.post("http://localhost/mail",
          data=json.dumps(dictionary_object),
          headers={ "content-type": "application/json" }
      )
      response_data = r.json()
      print (response_data["response"])
      assert response_data["response"] == "valid email"
      redis_key = response_data["key"]
      # delete test email from q, assert size is same as before
      MailQ.delete_item(redis_key)
      assert(MailQ.q_size() == q_size)

if __name__ == "__main__":
    unittest.main()