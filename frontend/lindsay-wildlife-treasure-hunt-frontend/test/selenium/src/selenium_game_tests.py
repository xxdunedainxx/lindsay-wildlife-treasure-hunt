import unittest
import warnings
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select
from src.util.Toggle import enabled
from src.util.LogFactory import LogFactory
from src.util.TestSupport import TestSupport

numpad = ["btn-zero", "btn-one", "btn-two", "btn-three", "btn-four",
                    "btn-five", "btn-six", "btn-seven", "btn-eight", "btn-nine"]

@enabled
def selenium_game_tests(a_test_os, a_browser, a_base_url, a_page_title):
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
