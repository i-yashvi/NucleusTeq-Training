a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
c = int(input("Enter third number: "))

if a > b and a > c : print(f"{a} is the largest of all three input number!")
elif b > a and b > c : print(f"{b} is the largest of all three input number!")
else : print(f"{c} is the largest of all three input number!")