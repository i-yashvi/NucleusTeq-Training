#Revisit
from collections import Counter

with open("example.txt", 'r') as file:
    text = file.read()
print(dict(Counter(text)))