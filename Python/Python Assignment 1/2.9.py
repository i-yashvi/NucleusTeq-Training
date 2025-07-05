def flatten_list(nested):
    flat = []
    for item in nested:
        if isinstance(item, list):
            flat.extend(flatten_list(item))
        else:
            flat.append(item)
    return flat

nested_list = [1, [2, [3, 4], 5], 6]
print(f"Flattened list: {flatten_list(nested_list)}")