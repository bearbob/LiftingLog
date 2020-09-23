# Running ADB Debugging with WSL

This guide is intended to help you, if you want to work with a physical device
on Windows with the WSL (e.g. Ubuntu). Mostly you just need to follow the guide
linked below. The listed steps are just a quick reminder if you've done the
setup before.

## Guide

Main Guide: http://defrances.co/post/adbwsl/

## Quick Guide

1. Make sure that you have adb for both windows and WSL installed (see link above)
2. If the adb daemon is running on WSL, kill it (`adb kill-server`)
3. Start the daemon on the Windows command line (`adb start-server`)
4. Plug in you device via USB
4. Run `adb devices` on WSL. If everything worked, your device will be listed