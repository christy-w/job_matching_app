#!/bin/sh
NAME="juicylauncher"
PW="juicylauncher"

# Reference link: 
# http://ionicframework.com/docs/guide/publishing.html

# copy locale files (e.g. if need localized app name)
#cp -fR res/* platforms/android/res/

# change to root folder to ensure paths are correct
cd ../

# build unsigend release APK (assume using Crosswalk to generate multiple APK files)
cordova build --release android
mv platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk $NAME-armv7-release-unsigned.apk
mv platforms/android/build/outputs/apk/android-x86-release-unsigned.apk $NAME-x86-release-unsigned.apk

# sign the release APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $NAME.keystore -storepass $PW $NAME-armv7-release-unsigned.apk $NAME
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $NAME.keystore -storepass $PW $NAME-x86-release-unsigned.apk $NAME

# ensure last APK is removed
rm $NAME-armv7-signed.apk
rm $NAME-x86-signed.apk

# optimize the signed APK, and removed unsigned release APK
zipalign -v 4 $NAME-armv7-release-unsigned.apk $NAME-armv7-signed.apk
zipalign -v 4 $NAME-x86-release-unsigned.apk $NAME-x86-signed.apk
rm $NAME-armv7-release-unsigned.apk
rm $NAME-x86-release-unsigned.apk
