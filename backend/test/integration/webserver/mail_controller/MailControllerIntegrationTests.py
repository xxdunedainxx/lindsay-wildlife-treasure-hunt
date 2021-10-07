from src.Singletons import Singletons
from src.util.LogFactory import LogFactory
import requests
import json

from test.util.decorators.Toggle import enabled, disabled

import unittest


@enabled
def mail_controller_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL CONTROLLER TESTS")
    unittest.main(module=__name__, exit=False)

class MailControllerIntegrationTests(unittest.TestCase):

    @enabled
    def test_integration_sending_email_request(self):
      MailQ = Singletons.mailQ
      # get size before adding email
      q_size = MailQ.q_size()
      dictionary_object = {"email": "test@google.com"}
      r = requests.post("http://localhost/mail",
          data=json.dumps(dictionary_object),
          headers={ "content-type": "application/json" }
      )
      response_data = r.json()
      assert r.status_code == 200
      print (response_data["response"])
      assert response_data["response"] == "valid email"
      redis_key = response_data["key"]

      assert (MailQ.q_size() == 1)
      item: {} = MailQ.get_json_item(redis_key)
      assert item["email"] == dictionary_object["email"]

      # delete test email from q, assert size is same as before
      MailQ.delete_item(redis_key)
      assert(MailQ.q_size() == q_size)

    @enabled
    def test_integration_sending_email_request_invalid_email(self):
      MailQ = Singletons.mailQ
      dictionary_object = {"email": "badEmail"}
      r = requests.post("http://localhost/mail",
          data=json.dumps(dictionary_object),
          headers={ "content-type": "application/json" }
      )

      response_data = r.json()
      print (response_data["response"])
      assert response_data["response"] == "invalid email"
      assert r.status_code == 400
      assert (MailQ.q_size() == 0)

    @enabled
    def test_integration_sending_email_request_no_payload(self):
      MailQ = Singletons.mailQ
      r = requests.post("http://localhost/mail")
      LogFactory.MAIN_LOG.info(f"No payload response {r.json()}")
      response_data = r.json()
      LogFactory.MAIN_LOG.info(f"Response ")
      assert response_data["response"] == "no payload provided"
      assert r.status_code == 400
      assert (MailQ.q_size() == 0)


if __name__ == "__main__":
    unittest.main()