from src.Configuration import Configuration

class MonitoringConfig(Configuration):

  def __init__(self):
    super(Configuration, self).__init__()
    self._init_conf('./monitoring/monitoring.conf.json')
    self.DEFAULT_VALUES: dict = {
      "TARGET_HOST" : "localhost",
      "POLLING_INTERVAL_MINUTES" : 5,
      "POLLING_BACKOFF_INTERVAL" : 1,
      "POLLING_FAILED_REQUESTS_THRESHOLD" : 5,
      "POLLING_THROTTLE_MINUTES" : 60
    }

    self._init_values()

  def _init_values(self):
    self.TARGET_HOST: str = self._get_value("TARGET_HOST")
    self.POLLING_INTERVAL_MINUTES: int = self._get_value("POLLING_INTERVAL_MINUTES")
    self.POLLING_BACKOFF_INTERVAL: int = self._get_value("POLLING_BACKOFF_INTERVAL")
    self.POLLING_FAILED_REQUESTS_THRESHOLD: int = self._get_value("POLLING_FAILED_REQUESTS_THRESHOLD")
    self.POLLING_THROTTLE_MINUTES: int = self._get_value("POLLING_THROTTLE_MINUTES")

MON_CONF_INSTANCE = MonitoringConfig()