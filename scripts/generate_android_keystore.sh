#!/bin/sh
NAME="juicylauncher"
PW="juicylauncher"

# Reference link: 
# http://ionicframework.com/docs/guide/publishing.html

# change to root folder to ensure paths are correct
cd ../

# key generation
keytool -genkey -v -keystore $NAME.keystore -storepass $PW -alias $NAME -keyalg RSA -keysize 2048 -validity 10000
