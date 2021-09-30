from src.Singletons import Singletons
from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE
import requests
import json

from test.util.decorators.Toggle import enabled, disabled

import unittest

@enabled
def mail_controller_tests():

    if CONF_INSTANCE.MAILER_TOGGLE:
        LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL CONTROLLER TESTS")
        unittest.main(module=__name__, exit=False)
    else:
        LogFactory.MAIN_LOG.warn("Skipping mail controller tests since it is not toggled on...")

class MailControllerTests(unittest.TestCase):

    @enabled
    def test_sending_email_request():
      MailQ = Singletons.mailQ
      # get size before adding email
      q_size = MailQ.q_size
      r = requests.post("localhost/mail",
          data=json.dumps({"email": "test@google.com"}),
      )
      assert r["response"] == "valid email"
      redis_key = r["key"]
      # delete test email from q, assert size is same as before
      MailQ.delete_item(redis_key)
      assert(MailQ.q_size() == q_size)

if __name__ == "__main__":
    unittest.main()