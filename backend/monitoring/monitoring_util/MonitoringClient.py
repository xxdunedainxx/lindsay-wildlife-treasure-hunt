import requests
from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace
from src.WebServer.controllers.monitor.AppHealthStatuses import AppHealthStatus
class MonitoringClient:

  def __init__(self, hostToCheck: str):
    self.host = hostToCheck

  def health_check(self) -> bool:
    is_healthy: bool = True
    try:
      req = requests.get(f"{self.host}/health")
      if req.status_code != 200:
        LogFactory.MAIN_LOG.error(f"Requested to {self.host} health endpoint failed, with response: {req.status_code}")
        is_healthy = False
      elif req.json()["status"] != AppHealthStatus.HEALTHY:
        LogFactory.MAIN_LOG.error(f"Requested to {self.host} succeeded, but the service is unhealthy {req.json()}")
        is_healthy = False
      else:
        LogFactory.MAIN_LOG.info("Service is healthy..")
    except Exception as e:
        LogFactory.MAIN_LOG.error(f"Something bad happened, {errorStackTrace(e)}")
        is_healthy = False

    return is_healthy

  def get_dependencies(self):
    pass