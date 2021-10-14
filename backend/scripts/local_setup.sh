#! /bin/bash

# Intended for running on a local development machine

PYTHON_INTERPRETER=($(which python || which python3))

if [[ $? != 0 ]];then
 echo "No python installation detected, trying to install.."
 if [[ $(uname -s) == 'Darwin' ]]; then
   brew install python3
 else
   # Assume ubuntu container
   apt-get install python3
 fi
fi

echo $PYTHON_INTERPRETER

# For unit testing
${PYTHON_INTERPRETER} -m pip install mock

# Linter for code style 
${PYTHON_INTERPRETER} -m pip install pylint

./scripts/setup.sh