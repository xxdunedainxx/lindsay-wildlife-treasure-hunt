from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# To be run in top-level directory

# configurations
page_title = 'Lindsay Wildlife Bio-diversity treasure hunt'
home_url = 'https://localhost:3000/ui/home'

def main():
    home_page_elements_desktop("linux", "firefox")
    home_page_elements_mobile("linux", "firefox")

def get_driver(os, browser):
    result = None
    if os == 'linux':
        file_name = 'driver_linux'
    if browser == 'chrome':
        directory = './frontend/lindsay-wildlife-treasure-hunt-frontend/test/selenium/drivers/chrome/'
        path = directory + file_name
        result = webdriver.Chrome(executable_path=path)
    elif browser == 'firefox':
        directory = './frontend/lindsay-wildlife-treasure-hunt-frontend/test/selenium/drivers/firefox/'
        path = directory + file_name
        result = webdriver.Firefox(executable_path=path)
    return result


def home_page_elements_desktop(os, browser):
    driver = get_driver(os, browser)
    driver.get(home_url)
    driver.set_window_size(1920, 1080)
    # test page title is correct
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
    driver.quit()

def home_page_elements_mobile(os, browser):
    driver = get_driver(os, browser)
    driver.get(home_url)
    driver.set_window_size(360, 640)
    # test page title is correct
    assert driver.title == page_title
    # test nav container is present
    elem = driver.find_element(By.ID, "nav-container")
    assert elem
    # test hamburger is present
    elem = driver.find_element(By.CLASS_NAME, "hamburger-text")
    assert elem.is_displayed()
    # test start game button is present
    elem = driver.find_element(By.CLASS_NAME, "start-button")
    assert elem
    driver.quit()

if __name__=="__main__":
    main()

# assert "Python" in driver.title
# elem = driver.find_element_by_name("q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()
