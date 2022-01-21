from src.WebServer.controllers.monitor.AppHealthStatuses import AppHealthStatus
from src.util.FileIO import FileIO
from src.Configuration import CONF_INSTANCE
from src.MultiThreading.ThreadPool import process_is_alive, WorkerPool
from src.Singletons import Singletons
from src.Services import ServiceNames
from src.util.LogFactory import LogFactory

import json

class AppHealthStatusUtil:

  @staticmethod
  def check_service_pids(service: str) -> bool:
    if ServiceNames.redis == service:
      return True

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
    if service == ServiceNames.redis:
      return AppHealthStatusUtil.check_redis_health()

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
    LogFactory.MAIN_LOG.debug("Laying down app health  status files")
    for service in AppHealthStatusUtil.get_enabled_services():
        LogFactory.MAIN_LOG.debug(f"Laying down {service} service file")
        AppHealthStatusUtil.write_status(service, AppHealthStatus.UNKNOWN)

  @staticmethod
  def get_enabled_services() -> [str]:
    rServices = []
    for service in CONF_INSTANCE.SERVICE_TOGGLES.keys():
      if CONF_INSTANCE.SERVICE_TOGGLES[service] == True:
        rServices.append(service)
    return rServices

  @staticmethod
  def check_redis_health():
    if Singletons.mailQ.health_check() == True:
      return AppHealthStatus.HEALTHY
    else:
      return AppHealthStatus.UNHEALTHY

  @staticmethod
  def get_all_services_html_formatted() -> str:
    LogFactory.MAIN_LOG.debug("Collecting service info html formatted")
    html_message: str = ""
    for service in AppHealthStatusUtil.get_enabled_services():
        html_message+=(f"<br /> * <b>[{service.upper()}]</b>: {AppHealthStatusUtil.get_status(service)}")
    return html_message


  @staticmethod
  def print_all_service_status():
    LogFactory.MAIN_LOG.info("===== SERVICE STATUSES =====")
    for service in AppHealthStatusUtil.get_enabled_services():
        LogFactory.MAIN_LOG.info(f"* [{service.upper()}]: {AppHealthStatusUtil.get_status(service)}")