from src.util.errors.CriticalAppCrashException import CriticalAppCrashedException
from src.util.errors.ExitCodes import ExitCodes

import sys, traceback

def errorStackTrace(e):
    exc_type, exc_obj, exc_tb = sys.exc_info()
    trace = traceback.format_exc()
    errorMessage = ("STACK TRACE ERROR :: " + str(e) + ".. Line number: " + str(
        exc_tb.tb_lineno) + "-- STACK TRACEBACK: " + str(trace))
    return errorMessage