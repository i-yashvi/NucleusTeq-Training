import re

text = "name=Yashvi&role=developer&lang=python"
pairs = dict(re.findall(r'(\w+)=([^&]+)', text))
print(pairs) 