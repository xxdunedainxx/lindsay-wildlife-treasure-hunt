import os
from src.util.FileIO import FileIO

class MailFormatter:

  TEMPLATE_DIR=f"src{os.sep}Mail{os.sep}html_templates"

  def __init__(self,username: str,  htmlTemplate: str = 'Congrats.html'):
    self.username: str = username
    self.template: str = htmlTemplate


  def formatted_html(self) -> str:
    cwd=os.getcwd()
    html_content = FileIO.read_file_content_to_string(f"{os.getcwd()}{os.sep}{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}") # open(f"{MailFormatter.TEMPLATE_DIR}{os.sep}{self.template}").read()
    html_content = html_content.replace("$USERNAME", self.username)
    return html_content