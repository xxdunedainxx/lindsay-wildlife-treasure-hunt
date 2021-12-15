import os
from datetime import datetime
import shutil

class FileIO:

  def __init__(self):
    pass

  @staticmethod
  def touch_file(path):
    with open(path, 'w+'):
      os.utime(path, None)

  @staticmethod
  def file_exists(path):
    return os.path.isfile(path)

  @staticmethod
  def create_file_if_does_not_exist(path):
    FileIO.create_directory_if_does_not_exist(os.path.dirname(path))

    if FileIO.file_exists(path) is False:
      FileIO.touch_file(path)

  @staticmethod
  def read_file_content_to_string(path, seperator: str = ''):
    content = []
    with open(path, 'r') as file:
      content.extend(file.readlines())
    return seperator.join(content)

  @staticmethod
  def read_file_content(path):
    content = []
    with open(path, 'r') as file:
      content.extend(file.readlines())
    return content

  @staticmethod
  def generate_byte_file(path, bytes):
    with open(path, 'wb') as file:
      file.write(bytes)

  @staticmethod
  def get_bytes_from_file(path):
    b = None

    with open(path, 'rb') as file:
      b=file.readline()

    return b

  @staticmethod
  def lock_down_file(path):
    os.chmod(path, 500)

  @staticmethod
  def write_string_to_file(path, content):
    with open(path, 'w+') as file:
      file.write(content)

  @staticmethod
  def replace_file_content(path, content):
    with open(path, 'w') as file:
      file.write(content)

  @staticmethod
  def create_directory_if_does_not_exist(directory):
    print(directory)
    if os.path.exists(directory) == False:
      os.mkdir(directory)

  @staticmethod
  def delete_file(path):
    if FileIO.file_exists(path):
      os.remove(path)

  @staticmethod
  def whipe_file_contents(path):
    open(path, 'w').close()

  @staticmethod
  def copy_file(source: str, destintation: str):
    FileIO.create_file_if_does_not_exist(destintation)
    shutil.copyfile(source, destintation)

  @staticmethod
  def get_last_modification_time(path: str):
    return datetime.utcfromtimestamp(os.path.getmtime(path))
