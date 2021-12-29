from src.util.LogFactory import LogFactory
from src.Setup import Setup
from src.MultiThreading.Cron import Cron
from src.util.FileIO import FileIO
from src.WebServer.controllers.monitor.AppHealthStatuses import AppHealthStatus
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil
from src.Services import ServiceNames
from src.Configuration import CONF_INSTANCE

from pathlib import Path
import datetime
import os

class LogRotationJob:


  @staticmethod
  def log_rotation_job():
    AppHealthStatusUtil.write_status(ServiceNames.logRotation, AppHealthStatus.BUSY)
    Setup.init_thread_resources()
    LogFactory.MAIN_LOG.info(f"scheduling log rotation job for every {CONF_INSTANCE.LOG_ROTATION_JOB_INTERVAL_MINUTES} minute(s)")
    LogRotationJob.create_archive_dir()
    Cron.run_every_x_minutes(LogRotationJob.rotate_logs, CONF_INSTANCE.LOG_ROTATION_JOB_INTERVAL_MINUTES)
    AppHealthStatusUtil.write_status(ServiceNames.logRotation, AppHealthStatus.HEALTHY)
    Cron.execute_jobs()

  @staticmethod
  def rotate_logs():
    # copy contents of log files to dated log file
    # delete archive log files older than expiration days
    LogFactory.MAIN_LOG.info("Running log rotation job")
    LogRotationJob.rotate_daily_logs()
    LogRotationJob.prune_old_logs()

  @staticmethod
  def rotate_daily_logs():
    dt_for_logs=datetime.datetime.now()
    for path in Path('.').rglob('*.log'):
      fullPath: str = f"{os.sep}".join(path.parts)
      if 'archive' in fullPath:
        LogFactory.MAIN_LOG.info("skipping archive file")
        continue
      else:
        # LogFactory.MAIN_LOG
        LogFactory.MAIN_LOG.info(f"Archiving {fullPath}")
        FileIO.copy_file(fullPath, f"{CONF_INSTANCE.LOG_ROTATION_JOB_ARCHIVE_DIR}{dt_for_logs}{os.sep}{fullPath}")
        FileIO.whipe_file_contents(fullPath)

  @staticmethod
  def prune_old_logs():
    for path in Path(CONF_INSTANCE.LOG_ROTATION_JOB_ARCHIVE_DIR).rglob('*.log'):
      fullPath: str = f"{os.sep}".join(path.parts)
      lastModtime=FileIO.get_last_modification_time(fullPath)
      diff=(lastModtime -  datetime.datetime.now() ).days
      if diff >= CONF_INSTANCE.LOG_ROTATION_JOB_EXPIRATION_DAYS:
        LogFactory.MAIN_LOG.info(f"Deleting log file {fullPath}")
        FileIO.delete_file(fullPath)

  @staticmethod
  def create_archive_dir():
    FileIO.create_directory_if_does_not_exist(CONF_INSTANCE.LOG_ROTATION_JOB_ARCHIVE_DIR)

