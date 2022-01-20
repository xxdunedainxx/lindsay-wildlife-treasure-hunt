from smtplib import SMTP_SSL
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any
import os

from src.util.LogFactory import LogFactory
from src.Mail.MailFormatter import MailFormatter, MailTypes, ReportBugFormatter, ServerDownEmail

class SMTP:

  INSTANCE = None

  def __init__(self,
               username: str,
               password: str,
               smtpServer: str,
               smtpPort: int = 465
  ):
    self.username: str = username
    self.password: str = password
    self.smtp_server: str = smtpServer
    self.smtp_port: int = smtpPort

    # Default from user to current svc account
    self.from_user: str = username
    self.smtp_client: SMTP_SSL = self._generate_smtp_client()

  @staticmethod
  def get_smtp_client(username, password, server, port):
    if SMTP.INSTANCE == None:
      SMTP.INSTANCE = SMTP(
        username=username,
        password=password,
        smtpServer=server,
        smtpPort=port
      )

    return SMTP.INSTANCE


  def _generate_smtp_client(self) -> SMTP_SSL:
    LogFactory.MAIN_LOG.info(f"Start SMTP client with connection specs: {self.smtp_server}:{self.smtp_port}")
    client = SMTP_SSL(self.smtp_server, self.smtp_port)
    client.ehlo()
    return client

  def format_email_list(self, emails: [str]) -> str:
    return ", ".join(emails)

  def start_smtp_session(self):
    self.smtp_client: SMTP_SSL = self._generate_smtp_client()
    LogFactory.MAIN_LOG.info('start smtp session')
    self.smtp_client.login(self.username, self.password)

  def end_smtp_session(self):
    LogFactory.MAIN_LOG.info('end smtp session')
    self.smtp_client.close()

  def send_email(self, toEmails: [str], subject: str, emailBody: str):
    email_text = """\
From: %s
To: %s
Subject: %s

%s
    """ % (self.from_user, self.format_email_list(toEmails), subject, emailBody)

    LogFactory.MAIN_LOG.info(f"Sending email to {toEmails}, with subject {subject}")
    self.start_smtp_session()
    self.smtp_client.sendmail(self.from_user, toEmails, email_text)
    self.end_smtp_session()

  def send_html_email(self, emailData: dict , toEmail: Any, subject: str, emailBody: str, formatter: str = MailTypes.END_USER_CERTIFICATE_EMAIL):
    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = self.from_user
    msg['To'] = toEmail if type(toEmail) == str else self.format_email_list(toEmail)

    # Create the body of the message (a plain-text and an HTML version).
    if formatter == MailTypes.END_USER_CERTIFICATE_EMAIL:
      mailFormatter: MailFormatter = MailFormatter(emailData)
    elif formatter == MailTypes.SERVER_IS_DOWN_EMAIL:
      mailFormatter: ServerDownEmail = ServerDownEmail(emailData)
    else:
      mailFormatter: ReportBugFormatter = ReportBugFormatter(emailData)

    html = mailFormatter.formatted_html()

    # Record the MIME types of both parts - text/plain and text/html.
    htmlformatted = MIMEText(html, 'html')

    # Attach parts into message container.
    # According to RFC 2046, the last part of a multipart message, in this case
    # the HTML message, is best and preferred.
    msg.attach(htmlformatted)

    LogFactory.MAIN_LOG.info(f"Sending email to {toEmail}, with subject {subject}")
    self.start_smtp_session()
    self.smtp_client.sendmail(self.from_user, toEmail, msg.as_string())
    self.end_smtp_session()
