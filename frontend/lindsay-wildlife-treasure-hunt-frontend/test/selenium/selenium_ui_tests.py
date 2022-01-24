from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# s = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(executable_path="./drivers/chrome/chromedriver_linux")
driver.get("https://lindsay-wildlife-apps.zee-aws.net/ui/home")
elem = driver.find_element(By.CLASS_NAME, "welcomeMessage").text
assert elem == "Welcome to our Biodiversity Scavenger Hunt!"

driver.quit()


# assert "Python" in driver.title
# elem = driver.find_element_by_name("q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()
