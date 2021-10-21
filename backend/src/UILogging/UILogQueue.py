from src.redis.RedisClient import RedisClient
from src.redis.RedisConfig import RedisClientConfig
from src.Configuration import CONF_INSTANCE

class UILogQueue(RedisClient):

    INSTANCE = None

    def __init__(self):
        config: RedisClientConfig = RedisClientConfig(
            host=CONF_INSTANCE.REDIS_HOST,
            port=CONF_INSTANCE.REDIS_PORT,
            db_name=RedisClientConfig.UILogQueue
        )

        super(UILogQueue, self).__init__(config)

    @staticmethod
    def get_ui_log_queue():
        if UILogQueue.INSTANCE == None:
            UILogQueue.INSTANCE = UILogQueue()
        return UILogQueue.INSTANCE
