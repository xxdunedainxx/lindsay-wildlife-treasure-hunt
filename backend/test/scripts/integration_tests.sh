#! /bin/bash

export INTEGRATION_TESTING_ENABLED=true
export END_TO_END_TESTING_ENABLED=false
export UNIT_TESTING_ENABLED=false

python3 test.py
