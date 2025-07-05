original_number = int(input("Enter an integer: "))
sign = -1 if original_number < 0 else 1
number = abs(original_number)
reverse = 0
while number!=0 :
    digit = number % 10
    reverse = reverse*10 + digit
    number = number // 10
print(f"The reversed number of {original_number} is {reverse*sign}!")