#! /bin/bash

source ./src/util/VEGETA.src
source ./src/vegeta/get_attack_and_report.src

getAttackAndReport "${LINDSAY_APP_NAME}/ui/home"\
   "5s" \
   "100" \
   "test_ui_home_5s_100rps"

getAttackAndReport "${LINDSAY_APP_NAME}/ui/home"\
   "5s" \
   "400" \
   "test_ui_home_5s_400rps"