from smtplib import SMTP_SSL
from src.util.LogFactory import LogFactory

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

  """
  send_email(
      toEmails=["blah@gmail.com"],
      subject="Test omg email",
      emailBody="hello world"
    )
  """

  def send_email(self, toEmails: [str], subject: str, emailBody: str):
    email_text = """\
From: %s
To: %s
Subject: %s

%s
    """ % (self.from_user, self.format_email_list(toEmails), subject, emailBody)
    # crafted_email: str = f"""/
    # From: {self.from_user}
    # To: {self.format_email_list(toEmails)}
    # Subject: {subject}
    #
    # {emailBody}
    # """
    LogFactory.MAIN_LOG.info(f"Sending email to {toEmails}, with subject {subject}")
    self.start_smtp_session()
    self.smtp_client.sendmail(self.from_user, toEmails, email_text)
    self.end_smtp_session()

