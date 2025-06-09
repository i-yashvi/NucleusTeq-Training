def sort_by_second(tuples):
    return sorted(tuples, key=lambda x: x[1])

print(sort_by_second([(1, 3), (2, 1), (4, 2)]))  