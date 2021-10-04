from src.redis.RedisClient import RedisClient
from src.redis.RedisConfig import RedisClientConfig
from src.Configuration import CONF_INSTANCE

class MailQ(RedisClient):

    INSTANCE = None

    def __init__(self):
        config: RedisClientConfig = RedisClientConfig(
            host=CONF_INSTANCE.REDIS_HOST,
            port=CONF_INSTANCE.REDIS_PORT,
            db_name=RedisClientConfig.MailQDB
        )

        super(MailQ, self).__init__(config)


    @staticmethod
    def get_mail_q():
        if MailQ.INSTANCE == None:
            MailQ.INSTANCE = MailQ()
        return MailQ.INSTANCE

    def get_keys_sorted(self):
        keys= self.get_keys()
        transform = list(map(int, keys))
        transform.sort()
        return transform
