import signal
import glob
import json
import os
from src.util.LogFactory import LogFactory
from src.util.ErrorFactory import errorStackTrace
from src.util.FileIO import FileIO

SIGNALS_TO_IGNORE : [int] = [
  28 #SIGWINCH
]

class ExitHandlers:
  LOGGER=None

  @staticmethod
  def write_primary_pid_to_file():
    LogFactory.MAIN_LOG.info(f"writing pid to file PRIMARY.PID {os.getpid()}")
    FileIO.write_string_to_file("PRIMARY.PID", f"{os.getpid()}")

  @staticmethod
  def sigterm_handler(_signo, _stack_frame):

    ExitHandlers.LOGGER = LogFactory.get_logger(
      logName='deadletter',
      stdOutOnly=False
    )
    ExitHandlers.LOGGER.info(f"signal detected {_signo}")
    ExitHandlers.kill_workers()
    exit(0)

  @staticmethod
  def kill_workers():
    ExitHandlers.LOGGER.info('killing workers')
    workerFiles = glob.glob('worker-pool*.json')
    ExitHandlers.LOGGER.info(f"files discovered: {workerFiles}")
    for workerFile in workerFiles:
      workerJson = json.load(open(workerFile, 'r'))
      for workerPid in workerJson['workerPids']:
        ExitHandlers.LOGGER.info(f"killing pid {workerPid}")
        try:
          os.kill(workerPid, signal.SIGKILL)
        except Exception as e:
          ExitHandlers.LOGGER.error(f"failed to kill pid {errorStackTrace(e)}")


  @staticmethod
  def catch_all_signals():
    ExitHandlers.write_primary_pid_to_file()
    catchable_sigs = set(signal.Signals)
    for sig in catchable_sigs:
      try:
        if sig in SIGNALS_TO_IGNORE:
          LogFactory.MAIN_LOG.info(f"SKIPPING (ignoring) signal {sig}")
        else:
          LogFactory.MAIN_LOG.debug(f"Detecting signal {sig}")
          signal.signal(sig,  ExitHandlers.sigterm_handler)
      except Exception as e:
        LogFactory.MAIN_LOG.debug(f"Failed to add signal [{sig}]")
