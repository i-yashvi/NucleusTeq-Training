def multiply(a):
    def by(b):
        return a * b
    return by

times3 = multiply(8)
print(times3(7))  