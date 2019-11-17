import network
import json
import wifi_config
import screen
from time import sleep

ap_if = network.WLAN(network.AP_IF)
sta_if = network.WLAN(network.STA_IF)

ap_if.active(True)
sta_if.active(True)


def get_status():
    status = {
        'ap': ap_if.ifconfig(),
        'sta': sta_if.ifconfig(),
    }

    return status


def get_network_list():
    networks = sta_if.scan()

    network_list = []

    for ssid, _, channel, rssi, authmode, hidden in sorted(networks, key=lambda x: x[3], reverse=True):
        ssid = ssid.decode('utf-8')

        network_list.append({
            'ssid': ssid,
            'channel': channel,
            'rssi': rssi,
            'authmode': authmode,
            'hidden': hidden
        })

    return network_list


def connect(ssid, password) -> str:
    sta_if.active(True)

    sta_if.disconnect()

    screen.print_line('C\'ing %s...' % ssid, 0)

    sta_if.connect(ssid, password)

    for attempt in range(10):
        connected = sta_if.isconnected()

        if connected:
            break

        sleep(1)

        screen.print_line('Attempt %i' % attempt, 1)

    if connected:
        ip_address = sta_if.ifconfig()[0]

        screen.print_line('Conn! %s' % ssid, 0)
        screen.print_line('IP %s' % ip_address, 1)

        ap_if.active(False)

        return ip_address
    else:
        screen.print_line('Failed!', 0)

        return None


def connect_and_save(ssid, password) -> str:
    ip_address = connect(ssid, password)

    if not ip_address == None:
        wifi_config.add_network_saved({'ssid': ssid, 'pass': password})

    return ip_address


def connect_to_saved(ssid) -> str:
    network_saved_list = wifi_config.get_network_saved_list()

    matches = [x for x in network_saved_list if x['ssid'] == ssid]

    if len(matches) == 0:
        return None

    network_saved = matches[0]
    password = network_saved['pass']

    return connect(ssid, password)


def list_saved() -> list:
    network_list = get_network_list()

    network_saved_list = wifi_config.get_network_saved_list()

    results = []

    for network_saved in network_saved_list:
        matches = [x for x in network_list if x['ssid']
                   == network_saved['ssid']]

        result = {
            'ssid': network_saved['ssid'],
            'saved': True
        }

        if len(matches) > 0:
            network = matches[0]

            result['channel'] = network['channel']
            result['rssi'] = network['rssi']

        results.append(result)

    # Sort by signal strength...
    results = sorted(results, key=lambda x: x['rssi'] if 'rssi' in x else -1000, reverse=True)

    return results


def auto_connect():
    networks_merged = list_saved()

    if len(networks_merged) > 0:
        strongest_network = networks_merged[0]

        if 'rssi' in strongest_network:
            ssid = strongest_network['ssid']

            connect_to_saved(ssid)

            return

    screen.print_line(ap_if.config('essid'), 0)
    screen.print_line('192.168.4.1', 1)
