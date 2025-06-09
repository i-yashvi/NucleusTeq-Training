def compose(*funcs):
    def composed(x):
        for f in reversed(funcs):
            x = f(x)
        return x
    return composed

triple = lambda x: x * 3
add_five = lambda x: x + 5

number = input("Enetr a number: ")
new_func = compose(triple, add_five)
print(new_func(8))  