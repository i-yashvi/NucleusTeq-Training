import re

def is_valid_ip(ip):
    pattern = r'^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$'
    return re.fullmatch(pattern, ip) is not None

print(is_valid_ip("101.101.11.11"))  
print(is_valid_ip("999.999.999.999"))  