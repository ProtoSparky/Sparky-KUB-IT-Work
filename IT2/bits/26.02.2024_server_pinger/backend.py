import subprocess
import platform
import re
import json
import time
from urllib.parse import urlparse
JSON_LOC = "./ServerData/1.json"
DEFAULT_FREQ = 10
##############################################################
##############################################################
##############################################################

def extract_number_from_ping(ping_string):
    # Use regex to find all digits in the string
    numbers = re.findall(r'\d+', ping_string)
    # Since you're interested in the first number, convert it to an integer
    return int(numbers[0]) if numbers else None
##############################################################
##############################################################
##############################################################
'''
def ping_server(host):
    """
    Pings a server and returns the ping time in milliseconds or None if the server cannot be found.
    """
    param = '-n' if platform.system().lower() == 'windows' else '-c'
    command = ['ping', param, '1', host]
    try:
        output = subprocess.check_output(command, stderr=subprocess.STDOUT, universal_newlines=True)
        # Extracting the time value from the output
        if 'time=' in output:
            time_index = output.find('time=') +  5
            time_value = output[time_index:].split()[0]
            # Returning the time in milliseconds
            return extract_number_from_ping(time_value)
    except subprocess.CalledProcessError:
        pass  # Server not found, return None
    return None
'''
def ping_server(host):
    """
    Pings a server and returns the ping time in milliseconds or None if the server cannot be found.
    """
    # Parse the host URL to extract the domain or IP address
    parsed_host = urlparse(host)
    # If a scheme is present, use the netloc attribute to get the hostname or IP address
    # If no scheme is present, use the host as is
    hostname = parsed_host.netloc if bool(parsed_host.scheme) else host

    param = '-n' if platform.system().lower() == 'windows' else '-c'
    command = ['ping', param, '1', hostname]
    try:
        output = subprocess.check_output(command, stderr=subprocess.STDOUT, universal_newlines=True)
        # Extracting the time value from the output
        if 'time=' in output:
            time_index = output.find('time=') +   5
            time_value = output[time_index:].split()[0]
            # Returning the time in milliseconds
            return extract_number_from_ping(time_value)
    except subprocess.CalledProcessError:
        pass  # Server not found, return None
    return None

def extract_number_from_ping(ping_string):
    # Use regex to find all digits in the string
    numbers = re.findall(r'\d+', ping_string)
    # Since you're interested in the first number, convert it to an integer
    return int(numbers[0]) if numbers else None
##############################################################
##############################################################
##############################################################

def json_reader():
    try:
        with open(JSON_LOC, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        return None
##############################################################
##############################################################
##############################################################

while True:
    if(json_reader() != None):
        json_data = json_reader()
        frequency = int(json_data["settings"]["update_timing"])
        #read data and init pause
        servers = len(json_data["servers"])
        current_server = 0
        while current_server < servers:
            ##iterate trough all domains
            current_server_name = list(json_data["servers"].keys())[current_server]
            current_server_data = json_data["servers"][current_server_name]
            if(current_server_data["enabled"] == True):
                ##check if server is enabled
                current_server_ping = ping_server(current_server_data["domain"])
                print(current_server_ping)
            current_server += 1
        print("sleeping...")
        time.sleep(frequency * 60000)


