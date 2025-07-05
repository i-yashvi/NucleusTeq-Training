from datetime import datetime

with open("logfile.txt", 'w') as file:
    timestamp = datetime.now()
    file.write(f"{timestamp}\n")