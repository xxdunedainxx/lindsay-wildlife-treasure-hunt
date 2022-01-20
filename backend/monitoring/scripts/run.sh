#! /bin/bash

PYTHON_INTERPRETER=($(which python || which python3))

echo "running app"

if [[ "${CONF_FILE}" != "none" ]]; then
  echo "Conf file override"
  echo $CONF_FILE >> ./conf.json
fi

if [[ "${MON_CONF}" != "none" ]]; then
  echo "MON Conf file override"
  echo MON_CONF >> ./monitoring.conf.json
fi

${PYTHON_INTERPRETER} ./monitoring.py