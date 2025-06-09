from contextlib import contextmanager

@contextmanager
def open_file(path, mode):
    f = open(path, mode)
    try:
        yield f
    finally:
        f.close()

with open_file("example.txt", "w") as f:
    f.write("Hello!")
