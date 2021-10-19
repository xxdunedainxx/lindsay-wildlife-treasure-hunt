#! /bin/bash

if [ -f "./deployment/INSTANCE.txt" && -f "./deployment/SSH_KEY_PATH.txt" ];then
  read -p "Please provide your AWS EC2 instance:" AWS_EC2_INSTANCE
  read -p "Please specify the path of your SSH Key" SSH_KEY_PATH

  echo "${AWS_EC2_INSTANCE}" > "./deployment/INSTANCE.txt"
  echo "${SSH_KEY_PATH}"     > "./deployment/SSH_KEY_PATH.txt"
else
  AWS_EC2_INSTANCE=$(cat "./deployment/INSTANCE.txt")
  SSH_KEY_PATH=$(cat "./deployment/SSH_KEY_PATH.txt")
fi

HOME=$(pwd)

./deployment/bundle.sh

ssh "ec2-user@${AWS_EC2_INSTANCE}" -i "${SSH_KEY_PATH}" -- """\
./docker_setup.sh;
./install_new_images.sh;
./run.sh;
"""
