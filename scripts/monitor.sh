#!/bin/bash

source ~/.lindsay_monitor.src

EMAIL_ARRAY=($EMAIL_ADDRESSES)

# function to send email
send_alert_email() {
    # TODO: function takes a space separated list of emails as args
    #to=$1
    #echo "Sending alert message to $to"
    #curl --ssl-reqd \
  #--url 'smtps://smtp.gmail.com:465' \
  # email password goes after colon on next line
  #--user 'lindsaywildlifetech@gmail.com:' \
  #--mail-from 'lindsaywildlifetech@gmail.com' \
  #--mail-rcpt '$to' \
  #--upload-file alert_email.txt
}

# get app health status
status=$(curl https://lindsay-wildlife-apps.zee-aws.net/backend/health \
    | jq --raw-output '.status')
if [[ $status == 'HEALTHY' ]]; then
    echo 'App is healthy :)'
# if we don't get a healthy response:
else
    current_time_seconds=$(date +"%s")
    last_alert_seconds=$(cat ./scripts/LAST_ALERT.txt)
    # if it's been more than 30 mins since last alert, send alert emails
    if [ $(($current_time_seconds - $last_alert_seconds)) -ge $ALERT_INTERVAL_SECONDS ]; then
        minutes_since_alert=$(expr $(($current_time_seconds - $last_alert_seconds)) / 60)
        echo $minutes_since_alert' minutes since last alert'
        # send_alert_email
        # rewrite LAST_ALERT.txt with current time
        > LAST_ALERT.txt
        echo "${current_time_seconds}" > "LAST_ALERT.txt"
    fi
fi