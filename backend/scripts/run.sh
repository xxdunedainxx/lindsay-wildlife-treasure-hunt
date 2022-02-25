#! /bin/bash

PYTHON_INTERPRETER=($(which python3 || which python))

echo "running app"

if [[ "${CONF_FILE}" != "none" ]]; then
  echo "Conf file override"
  echo $CONF_FILE >> ./conf.json
fi

cat ./conf.json

${PYTHON_INTERPRETER} ./app.py