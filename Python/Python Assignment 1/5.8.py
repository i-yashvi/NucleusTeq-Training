import re

def remove_tags(s):
    return re.sub(r'<[^>]+>', '', s)

html = "<p>Hello <i>World</i><p>"
print(remove_tags(html))