from src.util.LogFactory import LogFactory
from src.MultiThreading.Cron import Cron

from src.Configuration import CONF_INSTANCE
from src.Mail.SMTP import SMTP
from src.Singletons import Singletons

from monitoring.monitoring_util.MonitoringClient import MonitoringClient
from monitoring.conf.MonitoringConfig import MON_CONF_INSTANCE
from src.Mail.MailFormatter import MailTypes

import time
from datetime import datetime

class MonitoringHealthServiceJob:

  emailsPerJobExecution: int = CONF_INSTANCE.MAIL_JOB_EMAILS_PER_JOB
  mailer: SMTP
  client: MonitoringClient
  lastFailureDetected: datetime = None


  @staticmethod
  def monitoring_job():
    Singletons.generate_smtp_client()
    LogFactory.main_log()

    LogFactory.MAIN_LOG.info(f"scheduling monitoring job for every {MON_CONF_INSTANCE.POLLING_INTERVAL_MINUTES} minute(s)")
    MonitoringHealthServiceJob.client = MonitoringClient(MON_CONF_INSTANCE.TARGET_HOST)
    Cron.run_every_x_minutes(MonitoringHealthServiceJob.run_health_check, MON_CONF_INSTANCE.POLLING_INTERVAL_MINUTES)

    Cron.execute_jobs()

  @staticmethod
  def run_health_check():
    if MonitoringHealthServiceJob.client.health_check() == False:
      LogFactory.MAIN_LOG.info("Check did not pass, will retry")
      if MonitoringHealthServiceJob.lastFailureDetected == None or (datetime.now() - MonitoringHealthServiceJob.lastFailureDetected ).min > MON_CONF_INSTANCE.POLLING_THROTTLE_MINUTES:
        MonitoringHealthServiceJob.health_check_with_retries()
    else:
      LogFactory.MAIN_LOG.info("Check passed..")

  @staticmethod
  def health_check_with_retries():
    total_attempts: int = 0

    while total_attempts < MON_CONF_INSTANCE.POLLING_FAILED_REQUESTS_THRESHOLD:
      if MonitoringHealthServiceJob.client.health_check() == False:
        LogFactory.MAIN_LOG.error("Another check failed, retrying")
        total_attempts+=1
        time.sleep(MON_CONF_INSTANCE.POLLING_BACKOFF_INTERVAL)
      else:
        LogFactory.MAIN_LOG.info("Service back up! Returning")
        return

    # Threshold met, send email
    MonitoringHealthServiceJob.lastFailureDetected = datetime.now()

    smtp_client: SMTP = Singletons.smtp

    email_data: dict = {
      "version" : CONF_INSTANCE.VERSION,
      "host" : MON_CONF_INSTANCE.TARGET_HOST,
      "message" : f"We tried querying the host every {MON_CONF_INSTANCE.POLLING_BACKOFF_INTERVAL} minute(s), for {MON_CONF_INSTANCE.POLLING_FAILED_REQUESTS_THRESHOLD} request(s), and they all failed.."
    }

    smtp_client.send_html_email(
      emailData=email_data,
      toEmail=CONF_INSTANCE.BUG_REPORT_EMAIL_LIST,
      subject="SERVICE IS DOWN",
      emailBody="",
      formatter=MailTypes.SERVER_IS_DOWN_EMAIL
    )