import random

length = int(input("Enter the required length of the password: "))
print(f"Your password is ", end = "")
for x in range(0, length) :
    print(random.randint(0, 9), end = "")