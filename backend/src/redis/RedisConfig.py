class RedisClientConfig:

    MailQDB='email_sender'

    def __init__(self, host, port, db_name: str):
        self.host: str = host
        self.port: int = port
        self.db_name: str = db_name