import re

text = "Hello, world! This is Yashvi Mudgal."
tokens = re.findall(r'\w+|[^\w\s]', text)
print(tokens)  