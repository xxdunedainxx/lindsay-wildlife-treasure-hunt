#! /bin/sh

echo "running app"

if [[ "${CONF_FILE}" != "none" ]]; then
  echo "Conf file override"
  echo $CONF_FILE >> ./conf.json
fi

ls

python3 ./app.py