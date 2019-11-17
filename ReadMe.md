# EDUBLOCKS_ESP32

## Installation
git pull

Esp32 anschliessen und dann in einer Linux Bash:
export ESPTOOL_PORT=/dev/ttyUSB0
ausführen

Mit 'npm run flash' werden beide Projekte gebaut und auf den ESP32 geflasht

--> Nachdem der ESP32 restartet ist, aufs WLAN Netz des ESP32 verbinden und 192.168.4.1 aufrufen

## How to Factory Reset the ESP32?

sudo esptool.py --chip esp32 erase_flash
