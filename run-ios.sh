#!/bin/bash
declare -a simulators=("2C3CAD5D-4334-4DAC-B845-1435F8B6C0EA" "E2AEBCF5-9DFA-48CF-9B12-59C897154126")

for i in "${simulators[@]}"
do
    xcrun instruments -w $i
    xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.16.0.tar.app
    xcrun simctl openurl $i exp://127.0.0.1:19000      
done