#!/bin/sh
NAME="juicylauncher"
PW="juicylauncher"
VERSION="0.0.1"

# Reference link: 
# http://ionicframework.com/docs/guide/publishing.html

# copy locale files (e.g. if need localized app name)
#cp -fR res/* platforms/android/res/

# change to root folder to ensure paths are correct
cd ../

# build release APK
ionic cordova build android --prod --release
mv ./platforms/android/build/outputs/apk/release/android-release-unsigned.apk ./$NAME-release-unsigned.apk

# sign the release APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $NAME.keystore -storepass $PW $NAME-release-unsigned.apk $NAME

# ensure last APK is removed
rm $NAME-$VERSION-signed.apk

# optimize the signed APK, and removed unsigned release APK
zipalign -v 4 $NAME-release-unsigned.apk $NAME-$VERSION-signed.apk
rm $NAME-release-unsigned.apk
