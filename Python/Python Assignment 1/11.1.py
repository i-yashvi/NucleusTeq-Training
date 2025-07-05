import re

string = input("Enter a string: ")
emails = re.finall('\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', string)