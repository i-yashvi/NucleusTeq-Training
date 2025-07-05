import re

text = input("Enter a line with spaces in between: ")
replaced = re.sub(r'\s+', '-', text)
print(replaced)