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

  emailsPerJobExecution: int = CONF_INSTANCE.MAIL_JOB_EMAILS_PER_JOB
  mailQ: MailQ
  mailer: SMTP

  @staticmethod
  def mailer_job():
    AppHealthStatusUtil.write_status(ServiceNames.mail, AppHealthStatus.BUSY)
    Setup.init_thread_resources()

    LogFactory.MAIN_LOG.info(f"scheduling mailer job for every {CONF_INSTANCE.MAIL_JOB_INTERVAL_MINUTES} minute(s)")

    Cron.run_every_x_minutes(MailerJob.mailer_sync, CONF_INSTANCE.MAIL_JOB_INTERVAL_MINUTES)

    MailerJob.mailQ = Singletons.mailQ
    MailerJob.mailer = Singletons.smtp

    AppHealthStatusUtil.write_status(ServiceNames.mail, AppHealthStatus.HEALTHY)

    Cron.execute_jobs()

  @staticmethod
  def check_mail_q() -> {}:
    LogFactory.MAIN_LOG.info('checking email q')
    totalEmailsSent: int = 0
    while len(MailerJob.mailQ.get_keys_sorted()) > 0 and totalEmailsSent < MailerJob.emailsPerJobExecution:
      LogFactory.MAIN_LOG.info(f"{MailerJob.mailQ.get_keys_sorted()}")
      LogFactory.MAIN_LOG.info('Grabbing email from q')
      totalEmailsSent+=1
      MailerJob.send_mail(MailerJob.mailQ.get_json_item(MailerJob.mailQ.get_keys_sorted()[0], delete=True))

  @staticmethod
  def send_mail(emailData: {}):
    # TODO Re-q if the email fails 'x' number of times
    # TODO more advanced, configurable Email Templates (html??)
    # TODO More redis unit testing
    # TODO better way to do redis things?
    # TODO emailer to support single email objects, and not just arrays
    LogFactory.MAIN_LOG.info(f"attempting to send email data {emailData}")


    toEmail = emailData["email"]
    toUsername = emailData["username"]

    MailerJob.mailer.send_html_email(
      username=toUsername,
      toEmail=toEmail,
      subject="Congrats from Lindsay Wildlife!",
      emailBody="Some Email body"
    )
    LogFactory.MAIN_LOG.info(f"Email sent!")

  @staticmethod
  def mailer_sync():
    LogFactory.MAIN_LOG.info('executing mailer sync')
    MailerJob.check_mail_q()