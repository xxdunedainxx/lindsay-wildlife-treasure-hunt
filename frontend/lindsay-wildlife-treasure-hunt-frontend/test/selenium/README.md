=========================================
-----------------------------------------
  Lindsay Scavenger Hunt Selenium Tests
-----------------------------------------
=========================================
by Roderick MacLeod, 2/7/22

=========
  Setup
=========
Running the UI tests requires downloading the drivers specific to your machine
and the browser that you will be running testing on (including the version of the browser).

https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/

Note if using Safari, automation testing must be enabled in settings: 
https://www.browserstack.com/guide/run-selenium-tests-on-safari-using-safaridriver

!!! Rename the driver file to "driver_linux", "driver_macos" or "driver_windows", depending on your machine.
Place the file in /frontend/lindsay-wildlife-treasure-hunt-frontend/test/selenium/drivers
in either the firefox or chrome folder.

Next, open /frontend/lindsay-wildlife-treasure-hunt-frontend/test/selenium/test.json.
- Change the os to "linux", "macos" or "windows".
- Change the browser to "firefox", "chrome" or "safari".
- Change the base_url to the url of the version of the app you will be testing,
leaving off the "ui/home" suffix.

=====================
  Running the Tests
=====================
Run test.py from the selenium directory (/frontend/lindsay-wildlife-treasure-hunt-frontend/test/selenium/)

There may be a Resource Warning:
"ResourceWarning: Enable tracemalloc to get the object allocation traceback"
"ResourceWarning: unclosed <socket.socket ..."
This is a known bug and may be ignored.