import re

class EmailValidator:

  def is_valid(email):
    # https://www.w3resource.com/javascript/form/email-validation.php
    regex = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    if(re.search(regex,email)):
      return True
    else:
      return False