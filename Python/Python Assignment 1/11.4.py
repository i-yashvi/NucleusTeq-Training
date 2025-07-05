import re

text = "Naina and Darshika are Going to be Best Friends for Life."
capital_words = re.findall(r'\b[A-Z][a-z]*\b', text)
print(capital_words)