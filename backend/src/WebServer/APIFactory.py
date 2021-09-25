from src.WebServer.WebServerInit import WebServerInit

from src.Configuration import CONF_INSTANCE


class APIFactory:

    def __init__(self):
        WebServerInit.init_flask()
        self.prep_controllers()

    def prep_controllers(self):
        pass

    def run(self):
        WebServerInit.flask.run(host='localhost')