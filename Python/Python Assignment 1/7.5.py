class Counter:
    count = 0 

    def __init__(self):
        Counter.count += 2

a = Counter()
b = Counter()
print(Counter.count)  