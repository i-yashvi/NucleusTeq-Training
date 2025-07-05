var1 = int(input("Enter variable1: "))
var2 = int(input("Enter variable2: "))
print(f"Initially, variable1 was {var1} and variable2 was {var2}!")
var1, var2 = var2, var1
print(f"Now, variable1 is {var1} and variable2 is {var2}!")