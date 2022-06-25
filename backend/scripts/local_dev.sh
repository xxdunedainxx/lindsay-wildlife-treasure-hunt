#! /bin/bash

PYTHON_INTERPRETER=($(which python3 || which python))

${PYTHON_INTERPRETER} -m pip install pyopenssl
