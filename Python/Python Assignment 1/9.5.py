def read_lines(filepath):
    with open(filepath, "r") as f:
        for line in f:
            yield line.strip()

for line in read_lines("example.txt"):
    print(line)