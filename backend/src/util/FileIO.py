import os

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
    if FileIO.file_exists(path) is False:
      FileIO.touch_file(path)

  @staticmethod
  def read_file_content(path):
    content = ''
    with open(path, 'r') as file:
      content=file.readlines()
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