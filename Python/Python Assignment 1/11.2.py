import re

def is_valid_phone(number):
    return re.fullmatch(r'\d{3}-\d{3}-\d{4}', number) is not None

number = input("Enter a phone number: ")
print(is_valid_phone(number))