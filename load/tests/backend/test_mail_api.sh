#! /bin/bash

source ./src/util/VEGETA.src
source ./src/vegeta/post_attack_and_report.src

postAttackAndReport "${LINDSAY_APP_NAME}/backend/mail"\
   "5s" \
   "3" \
   "test_mail_api_5s_3rps" \
   "Content-Type: application/json\n@$(pwd)/tests/backend/data/example_email_post_request.json"
