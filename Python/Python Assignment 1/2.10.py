#Revisit
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_memo(n):
    if n <= 1:
        return n
    return fibonacci_memo(n - 1) + fibonacci_memo(n - 2)

n = int(input("Enter which Fibonacci term to print: "))
print(f"{n}th Fibonacci number is {fibonacci_memo(n)}")