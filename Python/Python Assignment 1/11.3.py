import re
text = "College over! #MissingFriends #CoorporateLife #SadLife"
hashtags = re.findall(r'#\w+', text)
print(hashtags)  