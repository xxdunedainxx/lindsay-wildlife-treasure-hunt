#! /bin/bash

echo "START MONITORING AGENT CONTAINER"

docker run -e "CONF_FILE=$(cat ./conf.json)" -e "MON_CONF=$(cat ./monitoring.conf.json)" --name lindsay_app_monitoring -d lindsay_app_monitoring