class InvalidAgeError(Exception):
    pass

def validate_age(age):
    if age < 0 or age > 120:
        raise InvalidAgeError("Invalid age provided!")

try:
    validate_age(150)
except InvalidAgeError as e:
    print(e)