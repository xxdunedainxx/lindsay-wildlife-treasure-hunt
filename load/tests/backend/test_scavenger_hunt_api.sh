#! /bin/bash

source ./src/util/VEGETA.src
source ./src/vegeta/get_attack_and_report.src

getAttackAndReport "${LINDSAY_APP_NAME}/backend/scavenger_hunt"\
   "5s" \
   "100" \
   "test_scavenger_hunt_5s_100rps"

getAttackAndReport "${LINDSAY_APP_NAME}/backend/scavenger_hunt"\
   "5s" \
   "400" \
   "test_scavenger_hunt_5s_400rps"


