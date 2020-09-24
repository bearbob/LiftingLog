# Running the Project with WSL

This guide is intended to help you, if you want to work with a physical device
on Windows with the WSL (e.g. Ubuntu). Mostly you just need to follow the guide
linked below. The listed steps are just a quick reminder if you've done the
setup before.

Keep in mind that when you run `npm install`, you need to do it from the windows command line.
Otherwise access problems could arise when trying to build the app.

## Setup physical device

Setup Guide: http://defrances.co/post/adbwsl/

### Quick Start Guide

1. Make sure that you have adb for both windows and WSL installed (see link above)
2. If the adb daemon is running on WSL, kill it (`adb kill-server`)
3. Start the daemon on the Windows command line (`adb start-server`)
4. Plug in you device via USB
4. Run `adb devices` on WSL. If everything worked, your device will be listed

## Run the project

You cannot simply run react-native in WSL, but there is a [workaround](https://stackoverflow.com/questions/42614347/running-react-native-in-wsl-with-the-emulator-running-directly-in-windows):
1. Use WSL to navigate to the root folder of the project
2. Navigate to `android`
3. Compile and deploy with `/mnt/c/Windows/System32/cmd.exe /C gradlew.bat installDebug`
4. Open a new tab (or use a second window) and navigate to the root of the project
5. Run `npm start` or `react-native start` to start the debug server

## Resources

* http://defrances.co/post/adbwsl/
* https://stackoverflow.com/questions/42614347/running-react-native-in-wsl-with-the-emulator-running-directly-in-windows
* https://gist.github.com/bergmannjg/461958db03c6ae41a66d264ae6504ade#enable-access-to-adb-server-from-wsl2
* https://stackoverflow.com/questions/53365643/windows-subsystem-for-linux-not-recognizing-java-home-environmental-variable