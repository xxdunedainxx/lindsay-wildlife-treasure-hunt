#! /bin/bash

source ./src/util/VEGETA.src
source ./src/vegeta/get_attack_and_report.src

getAttackAndReport "${LINDSAY_APP_NAME}/health"\
   "5s" \
   "100" \
   "test_app_health_5s_100rps"

getAttackAndReport "${LINDSAY_APP_NAME}/health"\
   "5s" \
   "400" \
   "test_app_health_5s_400rps"

# 1000 r / sec fails!!
# attackAndReport "https://lindsay-wildlife-apps.zee-aws.net/health"\
#    "10s" \
#    "1000" \
#    "test_app_health_10s_1000rps"