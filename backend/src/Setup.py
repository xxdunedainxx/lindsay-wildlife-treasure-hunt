from src.Singletons import Singletons
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil
from src.util.LogFactory import LogFactory
from src.sec.JwtAuth import JwtAuth
from src.Configuration import CONF_INSTANCE

class Setup:

  @staticmethod
  def configure_security_policies():
    LogFactory.MAIN_LOG.info("Settuping up Security policies")
    JwtAuth.set_jwt_expiration_policy(
      CONF_INSTANCE.JWT_TOKEN_EXP_DAYS,
      CONF_INSTANCE.JWT_TOKEN_EXP_SECONDS
    )  

  @staticmethod
  def init_main_app_resources():
    LogFactory.main_log()
    AppHealthStatusUtil.lay_down_status_files()
    Singletons.generate_singletons()
    Setup.configure_security_policies()

  @staticmethod
  def init_thread_resources():
    LogFactory.main_log()
    Singletons.generate_singletons()
    Setup.configure_security_policies()