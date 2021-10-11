from src.Singletons import Singletons
from src.Mail.MailQ import MailQ
from src.redis.RedisClient import RedisClient
from src.redis.RedisConfig import RedisClientConfig
from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled
from mock import patch, MagicMock, Mock
from unittest.mock import MagicMock

import redis
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
    @patch('redis.Redis.get', MagicMock(return_value='testValue'))
    @patch('redis.Redis.delete', MagicMock(return_value=None))
    @patch('redis.Redis.keys', MagicMock(return_value=['testValue']))
    @patch('redis.Redis.set', MagicMock())
    def test_mail_q_get_tests(self):
        mock: Mock = redis.Redis
        mailQ: MailQ = Singletons.mailQ

        assert mailQ.get_item('testKey') == 'testValue'
        assert mailQ.get_and_delete('testKey') == 'testValue'
        assert mailQ.get_keys() == ['testValue']

        mock.keys.assert_called()
        mock.set.assert_not_called()

    @enabled
    @patch('redis.Redis.get', MagicMock(return_value=1))
    @patch('redis.Redis.delete', MagicMock(return_value=None))
    @patch('redis.Redis.keys', MagicMock(return_value=[2, 1, 3]))
    @patch('redis.Redis.set', MagicMock())
    def test_mail_q_get_tests_numeric_keys(self):
        mock: Mock = redis.Redis
        mailQ: MailQ = Singletons.mailQ

        assert mailQ.get_item('testKey') == 1
        assert mailQ.get_and_delete('testKey') == 1
        assert mailQ.get_keys() == [2, 1, 3]
        assert mailQ.get_keys_sorted() == [1, 2, 3]

        mock.keys.assert_called()
        mock.set.assert_not_called()



if __name__ == "__main__":
    unittest.main()