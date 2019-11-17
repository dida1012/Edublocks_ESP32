import mfrc522
from os import uname


def do_read():

	if uname()[0] == 'WiPy':
		rdr = mfrc522.MFRC522("GP14", "GP16", "GP15", "GP22", "GP17")
	elif uname()[0] == 'esp8266':
		rdr = mfrc522.MFRC522(0, 2, 4, 5, 14)
	elif uname()[0] == 'esp32':
		rdr = mfrc522.MFRC522(18, 23, 19, 22, 21)
	else:
		raise RuntimeError("Unsupported platform")

	print("")
	print("Place card before reader to read from address 0x08")
	print("")

	flag = 0
	payload = "Not Set"

	try:
		while flag==0:

			(stat, tag_type) = rdr.request(rdr.REQIDL)

			if stat == rdr.OK:

				(stat, raw_uid) = rdr.anticoll()

				if stat == rdr.OK:
					print("New card detected")
					print("  - tag type: 0x%02x" % tag_type)
					print("  - uid	 : 0x%02x%02x%02x%02x" % (raw_uid[0], raw_uid[1], raw_uid[2], raw_uid[3]))
					print("")

					if rdr.select_tag(raw_uid) == rdr.OK:

						key = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]

						if rdr.auth(rdr.AUTHENT1A, 8, key, raw_uid) == rdr.OK:
							payload = rdr.read(8)
							print("Address 8 data: %s" % payload)
							rdr.stop_crypto1()
							return payload
						else:
							print("Authentication error")
					else:
						print("Failed to select tag")
					flag=1

	except KeyboardInterrupt:
		print("Bye")