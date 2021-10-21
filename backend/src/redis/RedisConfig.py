class RedisClientConfig:

    MailQDB='email_sender'
    UILogQueue='ui_log_queue'

    def __init__(self, host, port, db_name: str):
        self.host: str = host
        self.port: int = port
        self.db_name: str = db_name

    def __str__(self):
        return f"""\
        host: {self.host},
        port: {self.port},
        db:  {self.db_name}
        """