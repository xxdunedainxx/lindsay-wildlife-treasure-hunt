from src.util.LogFactory import LogFactory
from src.Setup import Setup
from src.MultiThreading.Cron import Cron
from src.WebServer.controllers.monitor.AppHealthStatuses import AppHealthStatus
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil
from src.Services import ServiceNames

from src.Configuration import CONF_INSTANCE
from src.Mail.MailQ import MailQ
from src.Singletons import Singletons
from src.Mail.SMTP import SMTP

class MailerJob:

  emailsPerJobExecution: int = 50
  mailQ: MailQ

  @staticmethod
  def mailer_job():
    AppHealthStatusUtil.write_status(ServiceNames.mail, AppHealthStatus.BUSY)
    Setup.init_thread_resources()

    LogFactory.MAIN_LOG.info('scheduling mailer job for every 10 minutes')

    Cron.run_every_x_minutes(MailerJob.mailer_sync, 1)
    MailerJob.mailQ = Singletons.mailQ
    AppHealthStatusUtil.write_status(ServiceNames.mail, AppHealthStatus.HEALTHY)
    Cron.execute_jobs()

  @staticmethod
  def check_mail_q() -> {}:
    LogFactory.MAIN_LOG.info('checking email q')
    totalEmailsSent: int = 0
    while MailerJob.mailQ.q_size() > 0 and totalEmailsSent < MailerJob.emailsPerJobExecution:
      LogFactory.MAIN_LOG.info('Grabbing email from q')
      totalEmailsSent+=1

  @staticmethod
  def send_mail(email: {}):
    pass

  @staticmethod
  def mailer_sync():
    LogFactory.MAIN_LOG.info('executing mailer sync')
    MailerJob.check_mail_q()