from src.util.LogFactory import LogFactory
from src.Setup import Setup
from src.MultiThreading.Cron import Cron
from src.WebServer.controllers.monitor.AppHealthStatuses import AppHealthStatus
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil
from src.Services import ServiceNames

from src.Configuration import CONF_INSTANCE
from src.UILogging.UILogQueue import UILogQueue
from src.Singletons import Singletons

class UILoggerJob:

  uiLogQueue: UILogQueue = None
  uiLogger = None

  @staticmethod
  def ui_logger_job():
    AppHealthStatusUtil.write_status(ServiceNames.uiLogger, AppHealthStatus.BUSY)
    Setup.init_thread_resources()

    LogFactory.MAIN_LOG.info(f"scheduling UI Logger job for every {CONF_INSTANCE.UI_LOGGING_JOB_INTERVAL_MINUTES} minute(s)")

    Cron.run_every_x_minutes(UILoggerJob.check_ui_log_q, CONF_INSTANCE.UI_LOGGING_JOB_INTERVAL_MINUTES)

    UILoggerJob.uiLogQueue = Singletons.uiLogQ
    UILoggerJob.uiLogger = LogFactory.get_logger(
      logName='uiLog',
      stdOutOnly=False
    )

    AppHealthStatusUtil.write_status(ServiceNames.uiLogger, AppHealthStatus.HEALTHY)

    Cron.execute_jobs()

  @staticmethod
  def check_ui_log_q() -> {}:
    LogFactory.MAIN_LOG.info('checking ui log q')
    totalUILogsPulled: int = 0
    while len(UILoggerJob.uiLogQueue.get_keys_sorted()) > 0 and totalUILogsPulled < CONF_INSTANCE.UI_LOGGING_JOB_LOGS_PER_JOB:
      LogFactory.MAIN_LOG.info(f"{UILoggerJob.uiLogQueue.get_keys_sorted()}")
      LogFactory.MAIN_LOG.info('Grabbing ui log from queue')
      logData: dict = UILoggerJob.uiLogQueue.get_json_item(
        UILoggerJob.uiLogQueue.get_keys_sorted()[0],
        delete=True
      )
      UILoggerJob.stash_log_data(logData)
      totalUILogsPulled+=1

  @staticmethod
  def stash_log_data(data: dict):
    UILoggerJob.uiLogger.info(f"{data}")