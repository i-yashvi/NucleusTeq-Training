# Revisit
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        if exc_type:
            print(f"Exception: {exc_type.__name__} - {exc_val}")
        return True  

# Usage
with FileManager("example.txt", "w") as f:
    f.write("Hello, world!")