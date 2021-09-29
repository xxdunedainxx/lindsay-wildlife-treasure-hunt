from src.WebServer.controllers.monitor.AppHealthStatuses import AppHealthStatus
from src.util.FileIO import FileIO
from src.Configuration import CONF_INSTANCE
from src.MultiThreading.ThreadPool import process_is_alive, WorkerPool

import json

class AppHealthStatusUtil:

  @staticmethod
  def check_service_pids(service: str) -> bool:
    if FileIO.file_exists(WorkerPool.generate_info_filename(service)):
      processInfo = json.loads(FileIO.read_file_content_to_string(WorkerPool.generate_info_filename(service)))
      for workerPid in processInfo['workerPids']:
        if process_is_alive(workerPid) == False:
          return False
      return True
    else:
      return False

  @staticmethod
  def determine_health_status() -> str:
    for service in AppHealthStatusUtil.get_enabled_services():
        if AppHealthStatusUtil.is_healthy(service) == False:
          return AppHealthStatusUtil.get_status(service)

    return AppHealthStatus.HEALTHY

  @staticmethod
  def is_healthy(service: str) -> bool:
    return AppHealthStatusUtil.get_status(service) == AppHealthStatus.HEALTHY

  @staticmethod
  def get_status(service: str) -> str:
    if AppHealthStatusUtil.check_service_pids(service) == False:
       return AppHealthStatus.MISSING
    else:
      return FileIO.read_file_content_to_string(AppHealthStatusUtil.status_file_path(service))

  @staticmethod
  def write_status(service: str, status: str):
    FileIO.replace_file_content(AppHealthStatusUtil.status_file_path(service), status)

  @staticmethod
  def status_file_path(service: str) -> str:
    return f"{service}.status"

  @staticmethod
  def lay_down_status_files():
    for service in AppHealthStatusUtil.get_enabled_services():
        AppHealthStatusUtil.write_status(service, AppHealthStatus.UNKNOWN)

  @staticmethod
  def get_enabled_services() -> [str]:
    rServices = []
    for service in CONF_INSTANCE.SERVICE_TOGGLES.keys():
      if CONF_INSTANCE.SERVICE_TOGGLES[service] == True:
        rServices.append(service)
    return rServices