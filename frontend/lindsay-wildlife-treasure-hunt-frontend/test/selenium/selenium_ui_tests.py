from email.mime import base
import unittest
import warnings
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select
from src.util.Toggle import enabled, disabled
from src.util.LogFactory import LogFactory

# load environment variables

test_os = "linux"
browser = "chrome"
base_url = "https://localhost:3000/"
home_url = base_url + "ui/home"
game_url = base_url + "ui/game"
win_url = base_url + "ui/win"
page_title = "Lindsay Wildlife Bio-diversity treasure hunt"
numpad = ["btn-zero", "btn-one", "btn-two", "btn-three", "btn-four",
                    "btn-five", "btn-six", "btn-seven", "btn-eight", "btn-nine"]

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

    def test_complete_game_manual_entry_mobile(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        # click start game button
        driver.find_element(By.CLASS_NAME, "start-button").click()
        # open manual entry mode
        elem = driver.find_element(By.CLASS_NAME, "manual-entry-button").click()
        question_number = 1
        # for each question, until we reach the win page, perform these actions
        while(driver.current_url != win_url):
            # find current level header, check question number
            elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "current-level-header")))
            assert elem.text == ("Question " + str(question_number))
            # get the id of the clue text, enter into the numpad
            elem = driver.find_element(By.CLASS_NAME, "clue-text")
            artifact_id = list(elem.get_attribute("id"))
            for digit in artifact_id:
                numpad_button = driver.find_element(By.CLASS_NAME, numpad[int(digit)])
                numpad_button.click()
            # click submit
            driver.find_element(By.CLASS_NAME, "btn-submit").click()
            # confirm correct answer
            assert driver.find_element(By.CLASS_NAME, "correct-msg").is_displayed()
            assert driver.find_element(By.CLASS_NAME, "artifact-image").is_displayed()
            # go to next question
            driver.find_element(By.CLASS_NAME, "next-level-button").click()
            question_number += 1
        # on win page, check player drop down works
        dropdown = Select(driver.find_element(By.CLASS_NAME, "num-players-drop-down"))
        dropdown.select_by_visible_text("2")
        driver.find_element(By.CLASS_NAME, "num-players-button").click()
        # confirm name-input-1 and name-input-2 boxes are visible
        assert driver.find_element(By.ID, "name-input-1").is_displayed()
        assert driver.find_element(By.ID, "name-input-2").is_displayed()
        assert driver.find_element(By.CLASS_NAME, "cert-button").is_displayed
        # restart game, confirm redirects to ui/game and current question is 1
        driver.find_element(By.CLASS_NAME, "restart-game-button").click()
        driver.find_element(By.CLASS_NAME, "delete-progress-button").click()
        assert driver.current_url == game_url
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "current-level-header")))
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
        

    def test_reset_game_button(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        driver.find_element(By.CLASS_NAME, "start-button").click()
        # complete question 1
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "current-level-header")))
        assert elem.text == ("Question 1")
        elem = driver.find_element(By.CLASS_NAME, "manual-entry-button").click()
        elem = driver.find_element(By.CLASS_NAME, "clue-text")
        artifact_id = list(elem.get_attribute("id"))
        for digit in artifact_id:
            numpad_button = driver.find_element(By.CLASS_NAME, numpad[int(digit)])
            numpad_button.click()
        driver.find_element(By.CLASS_NAME, "btn-submit").click()
        # confirm correct answer
        assert driver.find_element(By.CLASS_NAME, "correct-msg").is_displayed()
        assert driver.find_element(By.CLASS_NAME, "artifact-image").is_displayed()
        # go to next question
        driver.find_element(By.CLASS_NAME, "next-level-button").click()
        # reset game
        elem = driver.find_element(By.CLASS_NAME, "restart-game-button")
        elem.click()
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "restart-game-button")))
        elem.click()
        # confirm we are at question 1
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "current-level-header")))
        assert elem.text == ("Question 1")

    def test_reload_game(self):
        driver = self.driver
        driver.set_window_size(360, 640)
        driver.get(home_url)
        driver.find_element(By.CLASS_NAME, "start-button").click()
        # complete question 1
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "current-level-header")))
        assert elem.text == ("Question 1")
        elem = driver.find_element(By.CLASS_NAME, "manual-entry-button").click()
        elem = driver.find_element(By.CLASS_NAME, "clue-text")
        artifact_id = list(elem.get_attribute("id"))
        for digit in artifact_id:
            numpad_button = driver.find_element(By.CLASS_NAME, numpad[int(digit)])
            numpad_button.click()
        driver.find_element(By.CLASS_NAME, "btn-submit").click()
        # confirm correct answer
        assert driver.find_element(By.CLASS_NAME, "correct-msg").is_displayed()
        assert driver.find_element(By.CLASS_NAME, "artifact-image").is_displayed()
        # go to next question
        driver.find_element(By.CLASS_NAME, "next-level-button").click()
        # reload page
        driver.refresh()
        # confirm we are at question 2
        elem = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "current-level-header")))
        assert elem.text == ("Question 2")

if __name__=="__main__":
    unittest.main()
    warnings.filterwarnings(action="ignore", message="unclosed", category=ResourceWarning)
