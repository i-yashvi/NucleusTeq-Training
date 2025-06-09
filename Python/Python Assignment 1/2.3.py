def sumAndAverage(list):
    total = sum(list)
    average = total / len(list) if list else 0
    print(f"Sum = {total}, Average = {average}")

list = list(map(int, input("Enter numbers separated by space: ").split()))
sumAndAverage(list)