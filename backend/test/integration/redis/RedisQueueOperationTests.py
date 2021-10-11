from src.Singletons import Singletons
from src.Mail.MailQ import MailQ
from src.redis.RedisClient import RedisClient
from src.redis.RedisConfig import RedisClientConfig
from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE

from test.util.decorators.Toggle import enabled, disabled
from mock import patch, MagicMock
import redis

import unittest


@enabled
def redis_queue_integration_tests():

    LogFactory.MAIN_LOG.info(f"RUNNING ALL MAIL CONTROLLER TESTS")
    unittest.main(module=__name__, exit=False)


class RedisQueueIntegrationTests(unittest.TestCase):

  @enabled
  def test_mail_q__put_get_delete_queue(self):
      testData: dict = {
        "testKey" : "testValue"
      }

      LogFactory.MAIN_LOG.info('Executing test \'test_put_get_delete_queue\'')
      mailQ: MailQ = Singletons.mailQ

      mailQ.put_item(
        'testKey',
        testData['testKey']
      )

      assert mailQ.q_size() == 1
      mailQ.delete_item('testKey')

      assert mailQ.get_item('testKey') == None


class CoreQueueUnitTests(unittest.TestCase):

  @enabled
  def test_core_redis_put_get_delete_queue(self):
      config: RedisClientConfig = RedisClientConfig(
          host=CONF_INSTANCE.REDIS_HOST,
          port=CONF_INSTANCE.REDIS_PORT,
          db_name='testDB'
      )

      client: RedisClient = RedisClient(config=config)

      testData: dict = {
        "testKey" : "testValue"
      }

      LogFactory.MAIN_LOG.info('Executing test \'test_put_get_delete_queue\'')

      client.put_item(
        'testKey',
        testData['testKey']
      )

      assert client.get_item('testKey') == testData['testKey']
      assert client.q_size() == 1
      client.delete_item('testKey')
      assert client.get_item('testKey') == None