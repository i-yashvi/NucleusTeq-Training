import re

def is_strong(password):
    pattern = r'^(?=.*\d)(?=.*[!@#$%^&*()_+=\-]).{8,}$'
    return re.fullmatch(pattern, password) is not None

password = input("Enter the password: ")
print(is_strong(password))