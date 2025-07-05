def read_file(file):
    with open(file, "r") as f:
        for line in f:
            yield line

def remove_empty(lines):
    for line in lines:
        if line.strip():
            yield line

def to_upper(lines):
    for line in lines:
        yield line.upper()

pipeline = to_upper(remove_empty(read_file("example.txt")))
for line in pipeline:
    print(line)
