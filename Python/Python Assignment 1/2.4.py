def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

term = int(input("Enter which Fibonacci term to print: "))
print(f"{term}th Fibonacci number is {fibonacci(term)}")