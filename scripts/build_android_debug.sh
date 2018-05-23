#!/bin/sh
NAME="juicylauncher"
VERSION="0.0.1"

# Reference link: 
# http://ionicframework.com/docs/guide/publishing.html

# copy locale files (e.g. if need localized app name)
#cp -fR res/* platforms/android/res/

# change to root folder to ensure paths are correct
cd ../

# build debug APK
ionic cordova build android --prod
cp ./platforms/android/build/outputs/apk/debug/android-debug.apk ./$NAME-$VERSION-debug.apk
