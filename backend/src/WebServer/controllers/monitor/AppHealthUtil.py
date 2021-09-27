from src.WebServer.controllers.monitor.AppHealthStatuses import AppHealthStatus
from src.util.FileIO import FileIO
from src.Configuration import CONF_INSTANCE

class AppHealthStatusUtil:

  @staticmethod
  def determine_health_status() -> str:
    for service in CONF_INSTANCE.SERVICE_TOGGLES.keys():
        if CONF_INSTANCE.SERVICE_TOGGLES[service] == True and AppHealthStatusUtil.is_healthy(service) == False:
          return AppHealthStatusUtil.get_status(service)
    return AppHealthStatus.HEALTHY

  @staticmethod
  def is_healthy(service: str) -> bool:
    return AppHealthStatusUtil.get_status(service) == AppHealthStatus.HEALTHY

  @staticmethod
  def get_status(service: str) -> str:
    return FileIO.read_file_content_to_string(AppHealthStatusUtil.status_file_path(service))

  @staticmethod
  def write_status(service: str, status: str):
    FileIO.replace_file_content(AppHealthStatusUtil.status_file_path(service), status)

  @staticmethod
  def status_file_path(service: str) -> str:
    return f"{service}.status"

  @staticmethod
  def lay_down_status_files():
    for service in CONF_INSTANCE.SERVICE_TOGGLES.keys():
      if CONF_INSTANCE.SERVICE_TOGGLES[service] == True:
        AppHealthStatusUtil.write_status(service, AppHealthStatus.UNKNOWN)