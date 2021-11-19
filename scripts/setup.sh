#!/bin/bash

# install jq
apt install jq -y

# Create monitor_source file
touch ~/.lindsay_monitor.src
read -p "please provide the lindsay app url" LINDSAY_URL_INPUT
echo "export LINDSAY_URL=${LINDSAY_URL_INPUT}" >> ~/.lindsay_monitor.src
read -p "please provide the email address(es) to be alerted, space separated" EMAIL_ADDRESSES
echo "export EMAILS_TO_ALERT=${EMAIL_ADDRESSES}" >> ~/.lindsay_monitor.src
read -p "How many seconds between alerts? (recommended 1800s=30min)" SECONDS
echo "export ALERT_INTERVAL_SECONDS=$($SECONDS)" >> ~/.lindsay_monitor.src

# ==========
#  Cron job
# ==========

HOME=$(pwd)
DIR=$(pwd)
MONITOR_JOB=$(cat ./scripts/MONITOR_JOB.txt)
MONITOR_SCRIPT=($HOME/monitor.sh)
CRON_FILE="/var/spool/cron/root"

# create LAST_ALERT.txt file
touch ./scripts/LAST_ALERT.txt
echo "0" > "./scripts/LAST_ALERT.txt"

# create cron file if it does not exist
if [ ! -f $CRON_FILE ]; then
	   echo "cron file for root does not exist, creating.."
	   touch $CRON_FILE
	   /usr/bin/crontab $CRON_FILE
fi

# schedule cron job for every 5 min
echo "Scheduling cron job for monitoring app..."
(crontab -l 2>/dev/null; echo "${MONITOR_JOB} $MONITOR_SCRIPT") | crontab -
# confirm job was scheduled
# (this is kind of a hack, but it works I think)
CURRENT_JOBS=$(crontab -l)
if [[ "${CURRENT_JOBS}" == *"${MONITOR_JOB} $DIR/monitor.sh"* ]]; then
      echo "Cron job scheduled!"
	  exit 0
else
      echo "WARNING: Cron job not set."
	  exit 1
fi