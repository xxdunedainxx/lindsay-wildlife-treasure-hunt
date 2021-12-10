from src.util.FileIO import FileIO

import logging
import sys
import os

class LogFactory():
    loggers = {}
    log_dir = f"{os.getcwd()}{os.sep}logs"
    log_level= 'INFO'
    log_stdout = True
    MAIN_LOG = None

    @staticmethod
    def get_logger(logName, stdOutOnly = False):
        if not stdOutOnly and LogFactory.log_dir != '' and  not os.path.exists(LogFactory.log_dir):
            os.makedirs(LogFactory.log_dir)

        if logName not in LogFactory.loggers:
            if not stdOutOnly:
              FileIO.create_file_if_does_not_exist(f"{LogFactory.log_dir}{os.sep}{logName}.log")

            LogFactory.loggers[logName] = logging.getLogger(logName)
            LogFactory.loggers[logName].setLevel(logging.getLevelName(LogFactory.log_level))
            formatter = logging.Formatter('[%(asctime)s %(levelname)s]: %(message)s')
            if not stdOutOnly:
              handler=logging.FileHandler(f"{LogFactory.log_dir}{os.sep}{logName}.log", encoding='utf-8')
              handler.setFormatter(formatter)
              LogFactory.loggers[logName].addHandler(handler)

            # create console handler with a higher log level
            if LogFactory.log_stdout:
                stdhandler = logging.StreamHandler(sys.stdout)
                stdhandler.setLevel(logging.getLevelName(LogFactory.log_level))
                stdhandler.setFormatter(formatter)
                LogFactory.loggers[logName].addHandler(stdhandler)

        return LogFactory.loggers[logName]

    @staticmethod
    def touch_file(path):
        with open(path, 'w+'):
            os.utime(path, None)

    @staticmethod
    def main_log():
        if LogFactory.MAIN_LOG is None:
          LogFactory.MAIN_LOG = LogFactory.get_logger(f"main", stdOutOnly=False)
          LogFactory.MAIN_LOG .info('=====   MAIN LOGGER STARTED     =====')