try:
    x = int(input("Enter a number: "))
    try:
        print(10 / x)
    except ZeroDivisionError:
        print("Cannot divide by zero!")
except ValueError:
    print("That's not a valid number.")