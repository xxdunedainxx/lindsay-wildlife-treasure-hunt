#! /bin/bash

source ./src/util/VEGETA.src
source ./src/vegeta/get_attack_and_report.src

getAttackAndReport "${LINDSAY_APP_NAME}/backend/test"\
   "5s" \
   "100" \
   "test_test_api_5s_100rps"

getAttackAndReport "${LINDSAY_APP_NAME}/backend/test"\
   "5s" \
   "400" \
   "test_test_api_5s_400rps"

# attackAndReport "${LINDSAY_APP_NAME}/backend/test"\
#    "10s" \
#    "1000" \
#    "test_app_health_10s_1000rps"

