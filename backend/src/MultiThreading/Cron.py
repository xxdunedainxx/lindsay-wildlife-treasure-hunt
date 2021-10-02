import schedule
import time
from src.util.LogFactory import LogFactory

class Cron:

  JOB_CHECK_SECONDS: int = 5

  def __init__(self):
    pass

  @staticmethod
  def run_every_ten_minutes(job):
    LogFactory.MAIN_LOG.info(f"schedule job {job} every ten minutes")
    schedule.every(10).minutes.do(job)

  @staticmethod
  def run_every_x_minutes(job, minutes):
    LogFactory.MAIN_LOG.info(f"schedule job {job} every {minutes} minute(s)")
    schedule.every(minutes).minutes.do(job)

  @staticmethod
  def execute_jobs():
    while True:
      LogFactory.MAIN_LOG.debug('checking scheduled jobs')
      schedule.run_pending()
      time.sleep(Cron.JOB_CHECK_SECONDS)