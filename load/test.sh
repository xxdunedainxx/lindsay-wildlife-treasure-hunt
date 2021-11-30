#! /bin/bash

source ./src/util/VEGETA.src
source ./src/util/SETUP.src

./tests/frontend/test_ui_home.sh
./tests/frontend/test_ui_game.sh
./tests/backend/test_scavenger_hunt_api.sh
./tests/backend/test_app_health.sh
./tests/backend/test_app_test_api.sh
./tests/backend/test_mail_api.sh