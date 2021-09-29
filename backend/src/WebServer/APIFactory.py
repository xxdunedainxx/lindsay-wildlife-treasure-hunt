from src.WebServer.WebServerInit import WebServerInit
from src.WebServer.controllers.monitor.AppHealth import AppHealthStatus
from src.WebServer.controllers.monitor.AppHealthUtil import AppHealthStatusUtil
from src.Services import ServiceNames
from src.Configuration import CONF_INSTANCE
from src.Setup import Setup

class APIFactory:

    instance = None

    def __init__(self, appHealthOnly : bool = True):

        WebServerInit.init_flask()
        self.app_health_only = appHealthOnly
        if appHealthOnly == True:
            self.app_health_controller()
        else:
            AppHealthStatusUtil.write_status(ServiceNames.apiServer, AppHealthStatus.BUSY)
            self.prep_controllers()

    def app_health_controller(self):
        from src.WebServer.controllers.monitor.AppHealth import AppHealthController
        self.app_health: AppHealthController = AppHealthController()

    def prep_controllers(self):
        from src.WebServer.controllers.test.TestController import TestController
        self.test_controller: TestController = TestController()

    def run(self, port: int = CONF_INSTANCE.FLASK_PORT_BIND):
        if self.app_health_only == False:
            AppHealthStatusUtil.write_status(ServiceNames.apiServer, AppHealthStatus.HEALTHY)

        WebServerInit.flask.run (
            host=CONF_INSTANCE.FLASK_HOST_BIND,
            port=port,
            debug=False,
        )

    @staticmethod
    def run_api_in_thread():
        Setup.init_main_app_resources()
        APIFactory.instance = APIFactory(appHealthOnly=False)
        APIFactory.instance.run()

    @staticmethod
    def run_app_health_thread():
        Setup.init_main_app_resources()
        APIFactory.instance = APIFactory(appHealthOnly=True)
        APIFactory.instance.run(
            port=CONF_INSTANCE.APP_HEALTH_PORT
        )