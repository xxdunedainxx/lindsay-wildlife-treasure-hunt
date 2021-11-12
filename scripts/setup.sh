#!/bin/bash

# confirm root user
if [ `id -u` -ne 0 ]; then
      echo "This script can be executed only as root, exiting..."
      exit 1
fi

# install jq
apt install jq -y

HOME=$(pwd)
MONITOR_SCRIPT=($HOME/monitor.sh)
CRON_FILE="/var/spool/cron/root"

# create cron file if it does not exist
if [ ! -f $CRON_FILE ]; then
	   echo "cron file for root does not exist, creating.."
	   touch $CRON_FILE
	   /usr/bin/crontab $CRON_FILE
fi

# schedule cron job for every 5 min
echo "Scheduling cron job for monitoring app..."
(crontab -l 2>/dev/null; echo "*/5 * * * * $MONITOR_SCRIPT") | crontab -
# confirm job was scheduled
    #TODO