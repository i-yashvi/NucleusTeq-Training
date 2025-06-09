#Revisit
def sum_all(*args):
    return sum(args)

numbers = list(map(int, input("Enter numbers separated by space: ").split()))
print(f"Sum is: {sum_all(*numbers)}")