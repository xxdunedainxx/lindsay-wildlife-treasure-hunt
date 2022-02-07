import sys, traceback

def errorStackTrace(e):
    exc_type, exc_obj, exc_tb = sys.exc_info()
    trace = traceback.format_exc()
    errorMessage = ("STACK TRACE ERROR :: " + str(e) + ".. Line number: " + str(
        exc_tb.tb_lineno) + "-- STACK TRACEBACK: " + str(trace))
    return errorMessage