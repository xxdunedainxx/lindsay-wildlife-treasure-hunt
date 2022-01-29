import os
from src.util.FileIO import FileIO

class MailTypes:
  END_USER_CERTIFICATE_EMAIL: str = "END_USER_CERTIFICATE_EMAIL"
  REPORT_A_BUG_EMAIL: str = "REPORT_A_BUG_EMAIL"
  SERVER_IS_DOWN_EMAIL: str ="SERVER_IS_DOWN_EMAIL"
  DEPLOYMENT_EMAIL: str = "DEPLOYMENT_EMAIL"


class MailFormatter:

  TEMPLATE_DIR=f"src{os.sep}Mail{os.sep}html_templates"

  def __init__(self,emailData: dict,  htmlTemplate: str = 'Congrats.html'):
    self.username: str = emailData["username"]
    self.template: str = htmlTemplate


  def formatted_html(self) -> str:
    cwd=os.getcwd()
    html_content = FileIO.read_file_content_to_string(f"{os.getcwd()}{os.sep}{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}") # open(f"{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}").read()
    html_content = html_content.replace("$USERNAME", self.username)
    return html_content

class ReportBugFormatter:

  TEMPLATE_DIR=f"src{os.sep}Mail{os.sep}html_templates"

  def __init__(self,emailData: dict,  htmlTemplate: str = 'ReportABug.html'):
    self.message: str = emailData["message"]
    self.deviceInfo: str = emailData["deviceInfo"]
    self.sessionID: str = emailData["sessionID"]
    self.version: str = emailData["version"]

    self.template: str = htmlTemplate


  def formatted_html(self) -> str:
    cwd=os.getcwd()
    html_content = FileIO.read_file_content_to_string(f"{os.getcwd()}{os.sep}{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}") # open(f"{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}").read()
    html_content = html_content.replace(
      "$MESSAGE",
      self.message
    )
    html_content = html_content.replace(
      "$DEVICEINFO",
      self.deviceInfo
    )
    html_content = html_content.replace(
      "$SESSIONID",
      self.sessionID
    )
    html_content = html_content.replace(
      "$VERSION",
      self.version
    )

    return html_content

class ServerDownEmail:

  TEMPLATE_DIR = f"src{os.sep}Mail{os.sep}html_templates"

  def __init__(self,emailData: dict,  htmlTemplate: str = 'ServerDown.html'):
    self.message: str = emailData["message"]
    self.version: str = emailData["version"]
    self.host: str = emailData["host"]

    self.template: str = htmlTemplate


  def formatted_html(self) -> str:
    cwd=os.getcwd()
    html_content = FileIO.read_file_content_to_string(f"{os.getcwd()}{os.sep}{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}") # open(f"{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}").read()

    html_content = html_content.replace(
      "$VERSION",
      self.version
    )

    html_content = html_content.replace(
      "$HOST",
      self.host
    )

    html_content = html_content.replace(
      "$MESSAGE",
      self.message
    )

    return html_content 

class DeploymentFormatter:

  TEMPLATE_DIR=f"src{os.sep}Mail{os.sep}html_templates"

  def __init__(self,emailData: dict,  htmlTemplate: str = 'Deployment.html'):
    self.service_info: str = emailData["service_info"]
    self.hostname: str = emailData["hostname"]
    self.version: str = emailData["version"]
    self.template: str = htmlTemplate


  def formatted_html(self) -> str:
    cwd=os.getcwd()
    html_content = FileIO.read_file_content_to_string(f"{os.getcwd()}{os.sep}{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}") # open(f"{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}").read()
    html_content = html_content.replace(
      "$SERVICE_INFO",
      self.service_info
    )
    html_content = html_content.replace(
      "$HOST",
      self.hostname
    )
    html_content = html_content.replace(
      "$VERSION",
      self.version
    )

    return html_content

FORMATTERS : dict  = {
  MailTypes.END_USER_CERTIFICATE_EMAIL : MailFormatter,
  MailTypes.REPORT_A_BUG_EMAIL : ReportBugFormatter,
  MailTypes.SERVER_IS_DOWN_EMAIL: ServerDownEmail
  MailTypes.DEPLOYMENT_EMAIL: DeploymentFormatter
}
