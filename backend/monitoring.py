from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace, ExitCodes, CriticalAppCrashedException
from monitoring.MonitoringAgent import MonitoringAgent
from src.MultiThreading.ExitHandlers import ExitHandlers

def main():
  try:
    ExitHandlers.catch_all_signals()
    agent: MonitoringAgent = MonitoringAgent()
    LogFactory.MAIN_LOG.info('====== INITIALIZING MONITORING AGENT ======')
    agent.run()
  except CriticalAppCrashedException as e:
    LogFactory.MAIN_LOG.error(f"A known exception was raised {errorStackTrace(e)}")
    exit(ExitCodes.FATAL_KNOWN)
  except Exception as e:
    LogFactory.MAIN_LOG.error(f"something went wrong :( {errorStackTrace(e)}")
    exit(ExitCodes.FATAL_UNKNOWN)

if __name__ == "__main__":
  LogFactory.main_log()
  LogFactory.MAIN_LOG.info('====== START MONITORING ======')
  main()
