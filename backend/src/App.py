from src.util.LogFactory import LogFactory
from src.MultiThreading.Cron import Cron
from src.Configuration import Configuration, CONF_INSTANCE
from src.Services import ServiceNames
from src.WebServer.APIFactory import APIFactory
from src.Setup import Setup
from src.MultiThreading.ThreadPool import WorkerPool

class App:

  conf: Configuration = None

  def __init__(self):
    self.conf: Configuration = CONF_INSTANCE
    Setup.init_main_app_resources()
    self.init_app_health()
    if CONF_INSTANCE.SERVICE_TOGGLES[ServiceNames.apiServer] == True:
      self.init_api_thread()

  def run(self):
    self.init_cron_jobs()

  def init_cron_jobs(self):
    LogFactory.MAIN_LOG.info('init cron manager')
    Cron.execute_jobs()

  def init_api_thread(self):
    self.api_worker: WorkerPool = WorkerPool(
      poolName=ServiceNames.apiServer,
      size=1,
      poolType='default',
      targetMethod=APIFactory.run_api_in_thread
    )

    self.api_worker.run()

  def init_app_health(self):
    self.app_info_worker: WorkerPool = WorkerPool(
      poolName="app_info",
      size=1,
      poolType='default',
      targetMethod=APIFactory.run_app_health_thread
    )

    self.app_info_worker.run()