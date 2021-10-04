from src.Singletons import Singletons
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil
from src.util.LogFactory import LogFactory

class Setup:

  @staticmethod
  def init_main_app_resources():
    LogFactory.main_log()
    AppHealthStatusUtil.lay_down_status_files()
    Singletons.generate_singletons()

  @staticmethod
  def init_thread_resources():
    LogFactory.main_log()
    Singletons.generate_singletons()