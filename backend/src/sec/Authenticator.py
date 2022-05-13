from src.util.LogFactory import LogFactory
from src.Configuration import CONF_INSTANCE

class Authenticator:

  @staticmethod
  def basic_user_auth(username: str, password: str) -> bool:
    return username in CONF_INSTANCE.ADMIN_USERS.keys() and CONF_INSTANCE.ADMIN_USERS[username] == password
