terms = int(input("Enter number of terms until which you want to print the series: "))
first = 0
second = 1
print(f"Fibonacci series up to {terms} terms is:", end=" ")

if terms == 1:
    print(first)
elif terms == 2:
    print(f"{first}, {second}")
else:
    print(f"{first}, {second}", end="")
for x in range(2, terms) :
    third = first + second
    first = second
    second = third
    print(f", {third}", end="")