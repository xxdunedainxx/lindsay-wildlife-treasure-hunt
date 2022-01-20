from src.util.LogFactory import LogFactory
from src.MultiThreading.Cron import Cron
from src.Configuration import Configuration, CONF_INSTANCE
from src.Singletons import Singletons

from monitoring.conf.MonitoringConfig import MonitoringConfig, MON_CONF_INSTANCE
from monitoring.jobs.MonitoringHealthService import MonitoringHealthServiceJob
class MonitoringAgent:

  conf: Configuration = None
  monitorConf: MonitoringConfig = None

  def __init__(self):
    self.conf: Configuration = CONF_INSTANCE
    self.monitorConf: MonitoringConfig = MON_CONF_INSTANCE
    Singletons.generate_smtp_client()

  def run(self):
    self.init_cron_jobs()

  def init_cron_jobs(self):
    LogFactory.MAIN_LOG.info('init cron manager')
    MonitoringHealthServiceJob.monitoring_job()
    Cron.execute_jobs()
