from src.util.LogFactory import LogFactory
from src.MultiThreading.Cron import Cron
from src.Configuration import Configuration, CONF_INSTANCE
from src.Services import ServiceNames
from src.WebServer.APIFactory import APIFactory
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil
from src.Setup import Setup
from src.MultiThreading.ThreadPool import WorkerPool
from src.MultiThreading.jobs.MailerJob import MailerJob
from src.MultiThreading.jobs.LogRotationJob import LogRotationJob
from src.MultiThreading.jobs.UILoggerJob import UILoggerJob

class App:

  conf: Configuration = None

  def __init__(self):
    self.conf: Configuration = CONF_INSTANCE
    Setup.init_main_app_resources()
    self.init_app_health()
    if CONF_INSTANCE.SERVICE_TOGGLES[ServiceNames.apiServer] == True:
      self.init_api_thread()

    self.init_smtp_mailer_job()
    self.init_log_rotation_job()
    self.init_ui_logger_job()

  def run(self):
    AppHealthStatusUtil.print_all_service_status()
    self.init_cron_jobs()

  def init_cron_jobs(self):
    LogFactory.MAIN_LOG.info('init cron manager')
    Cron.execute_jobs()

  def init_api_thread(self):
    LogFactory.MAIN_LOG.info("Spinning up API")
    self.api_worker: WorkerPool = WorkerPool(
      poolName=ServiceNames.apiServer,
      size=1,
      poolType='default',
      targetMethod=APIFactory.run_api_in_thread
    )

    self.api_worker.run()

  def init_app_health(self):
    LogFactory.MAIN_LOG.info("Spinning up App Health Web Service")
    self.app_info_worker: WorkerPool = WorkerPool(
      poolName="app_info",
      size=1,
      poolType='default',
      targetMethod=APIFactory.run_app_health_thread
    )

    self.app_info_worker.run()

  def init_log_rotation_job(self):
    LogFactory.MAIN_LOG.info("Init Log Rotation Job")
    self.log_rotation_job: WorkerPool = WorkerPool(
      poolName=ServiceNames.logRotation,
      size=1,
      poolType="default",
      targetMethod=LogRotationJob.log_rotation_job
    )

    self.log_rotation_job.run()

  def init_smtp_mailer_job(self):
    LogFactory.MAIN_LOG.info("Init SMTP Mailer Job")
    self.smtp_mailer_worker: WorkerPool = WorkerPool(
      poolName=ServiceNames.mail,
      size=1,
      poolType="default",
      targetMethod=MailerJob.mailer_job
    )

    self.smtp_mailer_worker.run()

  def init_ui_logger_job(self):
    LogFactory.MAIN_LOG.info("Init UI Logger Job")
    self.ui_logger_queue: WorkerPool = WorkerPool(
      poolName=ServiceNames.uiLogger,
      size=1,
      poolType="default",
      targetMethod=UILoggerJob.ui_logger_job
    )

    self.ui_logger_queue.run()
