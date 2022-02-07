import unittest
import warnings
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from src.util.Toggle import enabled
from src.util.LogFactory import LogFactory
from src.util.TestSupport import TestSupport

@enabled
def selenium_ui_tests(a_test_os, a_browser, a_base_url, a_page_title):
    global test_os, browser, base_url, home_url, game_url, win_url, page_title
    test_os = a_test_os
    browser = a_browser
    base_url = a_base_url
    home_url = base_url + "ui/home"
    game_url = base_url + "ui/game"
    win_url = base_url + "ui/win"
    page_title = a_page_title
    LogFactory.MAIN_LOG.info(f"Selenium tests: os="+ test_os + " browser=" + browser)
    unittest.main(module=__name__, exit=False)
    warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)

class HomePageElements(unittest.TestCase):    
    def setUp(self):
        self.driver=TestSupport.get_driver(test_os, browser)
    def tearDown(self):
        self.driver.close()

    def test_home_page_elements_desktop(self):
        driver = self.driver
        driver.set_window_size(1920, 1080)
        driver.get(home_url)
        # test page title is correct
        print(driver.title)
        assert driver.title == page_title
        # test page elements are present
        elem = driver.find_element(By.ID, "nav-container")
        assert elem
        elem = driver.find_element(By.CLASS_NAME, "welcome-message")
        assert elem
        elem = driver.find_element(By.ID, "lord-richard-avatar")
        assert elem
        elem = driver.find_element(By.CLASS_NAME, "start-button")
        assert elem
        # test hamburger is NOT present
        elem = driver.find_element(By.CLASS_NAME, "hamburger-text")
        assert not elem.is_displayed()

    def test_home_page_elements_mobile(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # page title is correct
        assert driver.title == page_title
        # test page elements are present
        elem = driver.find_element(By.CLASS_NAME, "welcome-message")
        assert elem
        elem = driver.find_element(By.ID, "lord-richard-avatar")
        assert elem
        elem = driver.find_element(By.ID, "nav-container")
        assert elem
        elem = driver.find_element(By.CLASS_NAME, "hamburger-text")
        assert elem
        elem = driver.find_element(By.CLASS_NAME, "start-button")
        assert elem

    def test_nav_to_about_page_desktop(self):
        driver = self.driver
        driver.set_window_size(1920, 1080)
        driver.get(home_url)
        # use desktop nav bar to visit about page
        driver.find_element(By.CLASS_NAME, "about-nav-link").click()
        # wait until page is loaded, assert elements are present
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "about-top-message")))
        assert elem
        elem = driver.find_element(By.CLASS_NAME, "about-page-container")
        assert elem

    def test_nav_to_about_page_mobile(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # use mobile nav bar to visit about page
        driver.find_element(By.CLASS_NAME, "hamburger-text").click()
        driver.find_element(By.CLASS_NAME, "about-mobile-nav-link").click()
        # wait until page is loaded, assert elements are present
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "about-top-message")))
        assert elem
        elem = driver.find_element(By.CLASS_NAME, "about-page-container")
        assert elem

    def test_lindsay_logo_link(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # navigate to about page
        driver.find_element(By.CLASS_NAME, "hamburger-text").click()
        driver.find_element(By.CLASS_NAME, "about-mobile-nav-link").click()
        # wait until top lindsay logo is present, test that it returns you to home page
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "lindsay-logo-nav"))).click()
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "welcome-message")))
        assert driver.current_url == home_url
    
    def test_nav_to_report_an_issue_mobile(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # navigate to about page
        driver.find_element(By.CLASS_NAME, "hamburger-text").click()
        driver.find_element(By.CLASS_NAME, "report-issue-mobile-nav-link").click()
        # wait until page loads and test for presence of elements
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "userInfoInputLabel")))
        assert elem
        elem = driver.find_element(By.ID, "describeIssueInput")
        assert elem

    def test_nav_to_home_page_via_nav_bar_mobile(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # navigate to about page
        driver.find_element(By.CLASS_NAME, "hamburger-text").click()
        driver.find_element(By.CLASS_NAME, "about-mobile-nav-link").click()
        # wait page loads, then use nav link to go back to home page
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "hamburger-text"))).click()
        driver.find_element(By.CLASS_NAME, "game-mobile-nav-link").click()
        # wait until page loads, assert home page elements are present and url is home url
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "welcome-message")))
        assert elem
        assert driver.current_url == home_url

    def test_start_game_button_mobile(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # click start game button
        driver.find_element(By.CLASS_NAME, "start-button").click()
        # wait until page loads and confirm current header is present and says Question 1
        assert driver.current_url == game_url
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "current-level-header")))
        print(elem.text)
        assert elem.text == "Question 1"
        
    def test_open_scanner_button_mobile(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # click start game button
        driver.find_element(By.CLASS_NAME, "start-button").click()
        # open scanner
        driver.find_element(By.CLASS_NAME, "open-scanner-button").click()
        assert driver.find_element(By.ID, "qrcodecanvas").is_displayed()
        # close scanner
        driver.find_element(By.CLASS_NAME, "open-scanner-button").click()
        assert len(driver.find_elements(By.ID, "qrcodecanvas")) == 0

if __name__=="__main__":
    unittest.main()
    warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
