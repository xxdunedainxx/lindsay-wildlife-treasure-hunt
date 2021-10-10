import re

class EmailValidator:

  @staticmethod
  def is_valid(email):
    regex = "(\.+\.)"
    if(re.search(regex,email)):
      return False
    regex = "(^\.)"
    if(re.search(regex,email)):
      return False
    regex = "(\.+@)"
    if(re.search(regex,email)):
      return False
    regex = "(@+[.!#$%&’*+/=?^_`{|}~-])"
    if(re.search(regex,email)):
      return False
    regex = "(^[a-zA-Z0-9]+@+[a-zA-Z0-9]*$)"
    if(re.search(regex,email)):
      return False
    regex = "(^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)"
    if(re.search(regex,email)):
      return True
    else:
      return False