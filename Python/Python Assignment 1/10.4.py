def apply_to_all(func, items):
    return [func(item) for item in items]

print(apply_to_all(abs, [-1, -9, 3]))  