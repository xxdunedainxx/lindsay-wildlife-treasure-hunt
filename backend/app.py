from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace
from src.App import App
import signal
from src.MultiThreading.ExitHandlers import ExitHandlers

def main():
  try:
    ExitHandlers.catch_all_signals()
    # signal.signal(signal.SIGTERM, ExitHandlers.sigterm_handler)
    app: App = App()
    app.run()
    # ExitHandlers.sigterm_handler('','')
  except Exception as e:
    LogFactory.MAIN_LOG.error(f"something went wrong :( {errorStackTrace(e)}")
    raise e

if __name__ == "__main__":
  LogFactory.main_log()
  LogFactory.MAIN_LOG.info('running main app')
  main()
