#!/bin/bash

source config.sh

# install jq
apt install jq -y

HOME=$(pwd)
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
if [[ "${CURRENT_JOBS}" == "${MONITOR_JOB} $DIR/monitor.sh" ]]; then
      echo "Cron job scheduled!"
else
      echo "WARNING: Cron job not set."
fi