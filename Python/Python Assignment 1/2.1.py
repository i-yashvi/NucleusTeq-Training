def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result = result*i
    return result

number = int(input("Enter a number to find factorial: "))
print(f"Factorial of {number} is {factorial(number)}")