#! /bin/bash

if id "lindsay-wildlife-app" &>/dev/null; then
  echo 'user found'
else
  echo 'user not found'
  sudo adduser lindsay-wildlife-app 
  sudo passwd lindsay-wildlife-app
  sudo su - lindsay-wildlife-app
  mkdir ./app
  exit

  sudo su
  echo "lindsay-wildlife-app ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
  # Add EC2 User to this dir
  setfacl -R -m u:ec2-user:rwx /home/lindsay-wildlife-app/

  exit

  sudo groupadd deployers
  sudo setfacl -m g:deployers:rwx -R /home/lindsay-wildlife-app/
fi

# Unconditionally add the user to deployers / docker to ensure they have permissions 
sudo usermod -a -G deployers $(whoami)
sudo usermod -a -G docker $(whoami)