#! /bin/sh

#PYTHON_INTERPRETER=($(which python3 || which python))

#if [[ $? != 0 ]];then
#  echo "No python installation detected, trying to install.."
#  if [[ $(uname -s) == 'Darwin']];then
#    brew install python3
#  else
#    # Assume ubuntu container
#    apt-get install python3
#  fi
#
#fi

python -m pip install pillow
python -m pip install qrcode
python -m pip install schedule
python -m pip install redis
python -m pip install psutil