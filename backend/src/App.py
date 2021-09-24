from src.util.LogFactory import LogFactory
from src.threading.Cron import Cron
from src.Configuration import Configuration, CONF_INSTANCE
from src.Singletons import Singletons

class App:

  conf: Configuration = None

  def __init__(self):
    self.conf: Configuration = CONF_INSTANCE
    LogFactory.main_log()
    Singletons.generate_singletons()

  def run(self):
    self.init_cron_jobs()

  def init_cron_jobs(self):
    LogFactory.MAIN_LOG.info('init cron manager')
    Cron.execute_jobs()
