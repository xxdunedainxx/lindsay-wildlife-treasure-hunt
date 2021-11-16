# variables for setup.sh
USER=$(whoami)
DIR=$(pwd)
MONITOR_JOB=$(cat ./scripts/MONITOR_JOB.txt)

# number of seconds between alert emails
ALERT_INTERVAL=$(1800)

# email addresses to alert
ZACH_EMAIL=$(zrmmaster92@gmail.com)
RORY_EMAIL=$(roderickjmacleod@gmail.com)