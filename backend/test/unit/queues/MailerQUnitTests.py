from src.Singletons import Singletons
from src.Mail.MailQ import MailQ
from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled

import unittest

@enabled
def mail_q_unit_tests():

    if CONF_INSTANCE.MAILER_TOGGLE:
        LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL QUEUE CODE TESTS")
        unittest.main(module=__name__, exit=False)
    else:
        LogFactory.MAIN_LOG.warn("Skipping mail queue tests since it is not toggled on...")

class MailQUnitTests(unittest.TestCase):

    @enabled
    def test_put_get_delete_queue(self):
        testData: dict = {
          "testKey" : "testValue"
        }

        LogFactory.MAIN_LOG.info('Executing test \'test_put_get_delete_queue\'')
        mailQ: MailQ = Singletons.mailQ

        mailQ.put_item(
          'testKey',
          testData['testKey']
        )

        assert mailQ.get_item('testKey') == testData['testKey']
        assert mailQ.q_size() == 1
        mailQ.delete_item('testKey')



if __name__ == "__main__":
    unittest.main()