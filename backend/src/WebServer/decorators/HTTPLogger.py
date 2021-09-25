# General library imports
from functools import wraps
import os

# Flask imports
from flask import request

# log in user import
#from ...web.http import get_loged_in_user

# Logging
from src.util.LogFactory import LogFactory

def http_logger(api):
    @wraps(api)
    def logger_wrapper(*args, **kwargs):
        LogFactory.MAIN_LOG.info(f"Method - {request.method} // Endpoint - {request.base_url} // User")
        return api(*args,**kwargs)
    return logger_wrapper