#! /bin/sh

PYTHON_INTERPRETER=($(which python3 || which python))

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

${PYTHON_INTERPRETER} -m pip install pillow
${PYTHON_INTERPRETER} -m pip install qrcode
${PYTHON_INTERPRETER} -m pip install schedule
${PYTHON_INTERPRETER} -m pip install redis
${PYTHON_INTERPRETER} -m pip install psutil
${PYTHON_INTERPRETER} -m pip install flask
${PYTHON_INTERPRETER} -m pip install flask-cors
${PYTHON_INTERPRETER} -m pip install mock