with open("example.txt", 'r') as file:
    lines = file.readlines()

with open("example.txt", 'w') as file:
    for i, line in enumerate(lines, 1):
        if line.strip():
            file.write(line)
        else:
            print(f"Removed empty line {i}")