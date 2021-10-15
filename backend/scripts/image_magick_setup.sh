#! /bin/bash

function setupImageMagick(){
  git clone https://github.com/ImageMagick/ImageMagick.git ImageMagick-7.1.0
  cd ImageMagick-7.1.0
  ./configure
  make
}

setupImageMagick