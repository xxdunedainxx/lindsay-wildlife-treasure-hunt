import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from src.util.Toggle import enabled, disabled
from src.util.LogFactory import LogFactory

# load environment variables

test_os="linux"
browser="chrome"
home_url="https://localhost:3000/ui/home"
page_title="Lindsay Wildlife Bio-diversity treasure hunt"


def selenium_ui_tests():
    LogFactory.MAIN_LOG.info(f"RUNNING ALL SELENIUM TESTS WITH os="+ test_os + " browser=" + browser)
    unittest.main(module=__name__, exit=False)

def get_driver(test_os, browser):
    result = None
    if test_os == 'linux':
        file_name = 'driver_linux'
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
    return result

class HomePageElements(unittest.TestCase):    
    def setUp(self):
        self.driver=get_driver(test_os, browser)
    def tearDown(self):
        self.driver.close()

    def test_home_page_elements_desktop(self):
        driver = self.driver
        driver.set_window_size(1920, 1080)
        driver.get(home_url)
        # test page title is correct
        print(driver.title)
        assert driver.title == page_title
        # test nav container is present
        elem = driver.find_element(By.ID, "nav-container")
        assert elem
        # test hamburger is NOT present
        elem = driver.find_element(By.CLASS_NAME, "hamburger-text")
        assert not elem.is_displayed()
        # test start game button is present
        elem = driver.find_element(By.CLASS_NAME, "start-button")
        assert elem
    
    def test_home_page_elements_mobile(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # test page title is correct
        assert driver.title == page_title
        # test nav container is present
        elem = driver.find_element(By.ID, "nav-container")
        assert elem
        # test hamburger is present
        elem = driver.find_element(By.CLASS_NAME, "hamburger-text")
        assert elem
        # test start game button is present
        elem = driver.find_element(By.CLASS_NAME, "start-button")
        assert elem

    def test_nav_to_about_page_desktop(self):
        driver = self.driver
        driver.set_window_size(1920, 1080)
        driver.get(home_url)
        driver.find_element(By.CLASS_NAME, "about-nav-link").click()
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "about-top-message")))
        assert elem

if __name__=="__main__":
    unittest.main()

# assert "Python" in driver.title
# elem = driver.find_element_by_name("q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()
