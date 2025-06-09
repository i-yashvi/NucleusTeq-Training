a = int(input("Enter first number: "))
b = int(input("Enter second number: "))

print(f"Addition of {a} with {b} is {a + b}")
print(f"Substraction of {a} from {b} is {a - b}")
print(f"Multiplication of {a} with {b} is {a * b}")
if b != 0:
    print(f"Division of {a} by {b} is {a / b}")
else:
    print(f"Division of {a} by {b} is not allowed.")