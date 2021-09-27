from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace
from src.App import App

def main():
  try:
    app: App = App()
    app.run()
  except Exception as e:
    LogFactory.MAIN_LOG.error(f"something went wrong :( {errorStackTrace(e)}")
    raise e

if __name__ == "__main__":
  LogFactory.main_log()
  LogFactory.MAIN_LOG.info('running main app')
  main()
