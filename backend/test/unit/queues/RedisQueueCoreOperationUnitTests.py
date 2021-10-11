from src.Singletons import Singletons
from src.Mail.MailQ import MailQ
from src.redis.RedisClient import RedisClient
from src.redis.RedisConfig import RedisClientConfig
from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled
from mock import patch, MagicMock, Mock
import redis

import unittest

@enabled
def redis_queue_unit_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL CONTROLLER TESTS")
    unittest.main(module=__name__, exit=False)


class RedisQueueCoreOperationsUnitTests(unittest.TestCase):

  @enabled
  @patch('redis.Redis.get', MagicMock(return_value='testValue'))
  @patch('redis.Redis.delete', MagicMock(return_value=None))
  @patch('redis.Redis.keys', MagicMock(return_value=['testValue']))
  @patch('redis.Redis.set',MagicMock())
  def test_redis_core_get_tests(self):
      mock: Mock = redis.Redis
      config: RedisClientConfig = RedisClientConfig(
          host=CONF_INSTANCE.REDIS_HOST,
          port=CONF_INSTANCE.REDIS_PORT,
          db_name='testDB'
      )

      client: RedisClient = RedisClient(config=config)

      assert client.get_item('testKey') == 'testValue'
      assert client.get_and_delete('testKey') == 'testValue'
      assert client.get_keys() == ['testValue']

      mock.keys.assert_called()
      mock.set.assert_not_called()

  @enabled
  @patch('redis.Redis.get', MagicMock(return_value=1))
  @patch('redis.Redis.delete', MagicMock(return_value=None))
  @patch('redis.Redis.keys', MagicMock(return_value=[2,1,3]))
  @patch('redis.Redis.set',MagicMock())
  def test_redis_core_get_tests_numeric_keys(self):

      mock: Mock = redis.Redis
      config: RedisClientConfig = RedisClientConfig(
        host=CONF_INSTANCE.REDIS_HOST,
        port=CONF_INSTANCE.REDIS_PORT,
        db_name='testDB'
      )

      client: RedisClient = RedisClient(config=config)

      assert client.get_item('testKey') == 1
      assert client.get_and_delete('testKey') == 1
      assert client.get_keys() == [2,1,3]
      assert client.get_keys_sorted() == [1,2,3]

      mock.keys.assert_called()
      mock.get.assert_called()
      mock.delete.assert_called()
      mock.set.assert_not_called()

  @enabled
  @patch('redis.Redis.get', MagicMock(return_value=1))
  @patch('redis.Redis.delete', MagicMock(return_value=None))
  @patch('redis.Redis.keys', MagicMock(return_value=[3,2,1]))
  @patch('redis.Redis.set',MagicMock())
  def test_redis_core_get_size(self):
      mock: Mock = redis.Redis
      config: RedisClientConfig = RedisClientConfig(
        host=CONF_INSTANCE.REDIS_HOST,
        port=CONF_INSTANCE.REDIS_PORT,
        db_name='testDB'
      )

      client: RedisClient = RedisClient(config=config)
      assert client.q_size() == 3
      assert len(client.get_keys()) == 3

      mock.keys.assert_called()
      mock.get.assert_not_called()
      mock.set.assert_not_called()