import re

text = "Date of Birth between 01-01-2002 and 12-12-2024."
dates = re.findall(r'\b\d{2}-\d{2}-\d{4}\b', text)
print(dates)  