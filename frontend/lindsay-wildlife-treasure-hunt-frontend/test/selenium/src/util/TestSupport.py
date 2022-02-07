from selenium import webdriver

class TestSupport:

    def get_driver(test_os, browser):
        result = None
        if test_os == 'linux':
            file_name = 'driver_linux'
        elif test_os == 'macos':
            file_name = 'driver_macos'
        elif test_os == 'driver_windows':
            file_name = 'driver_windows'
        if browser == 'chrome':
            directory = './drivers/chrome/'
            path = directory + file_name
            handling_ssl = webdriver.ChromeOptions()
            handling_ssl.add_argument('ignore-certificate-errors')
            result = webdriver.Chrome(executable_path=path, chrome_options=handling_ssl)
        elif browser == 'firefox':
            directory = './drivers/firefox/'
            path = directory + file_name
            result = webdriver.Firefox(executable_path=path)
        elif browser == 'safari':
            directory = './drivers/safari/'
            path = directory + file_name
            result = webdriver.Safari()
        return result