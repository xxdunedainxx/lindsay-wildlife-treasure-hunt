import redis
from src.redis.RedisConfig import RedisClientConfig
from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace
import json


class RedisClient:

    REDIS_DBS: {} = {
      # Redis DB for managing threads
      'thread_pool': 0,
      'client_logger' : 1,
      RedisClientConfig.MailQDB  : 2
    }
    _logger = None
    clientType: str = 'base'


    def __init__(self, config: RedisClientConfig, clientType: str = 'base'):
        self.clientType = clientType
        self.__init_logger()
        self._logger.info(f"Establishing redis connection {config.host}:{config.port}")
        self.redis_connection: redis.Redis = redis.Redis(host=config.host, port=config.port, db=RedisClient.REDIS_DBS[config.db_name], charset='utf-8', decode_responses=True, socket_connect_timeout=1)
        self.redis_connection.ping()
        self._logger.info('connection established!')

    def put_item(self, key, value):
        self._logger.info(f"Redis put {key} = {value}")
        self.redis_connection.set(key, value)

    def get_keys(self):
        return self.redis_connection.keys('*')

    def get_json_item(self, key, delete = False) -> dict:
        item = None
        if delete:
            item = self.get_and_delete(key)
        else:
            item = self.get_item(key)

        return json.loads(item)



    def get_item(self, key) -> str:
        self._logger.info(f"Redis GET {key}")
        return self.redis_connection.get(key)

    def delete_item(self, key) -> None:
        self.redis_connection.delete(key)

    def get_and_delete(self, key):
        get = self.get_item(key)

        self.delete_item(key)

        return get

    # returns the key of the item in the queue
    def add_to_q(self, json_object):
        try:
            redis_key = self.q_size() + 1
            self.put_item(redis_key, json.dumps(json_object))
            return redis_key
        except Exception as e:
            LogFactory.MAIN_LOG.error(f"Failed adding item to q {errorStackTrace(e)}")
            return -1

    def q_size(self) -> int:
        qsize = len(self.redis_connection.keys())
        self._logger.info(f"Current Q Size {qsize}")
        return qsize

    def __init_logger(self):
        self._logger = LogFactory.get_logger(f"redis-{self.clientType}")