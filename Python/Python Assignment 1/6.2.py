with open("example.txt", "r") as file:
    text = file.read()
words = text.split()
print(f"Word count in the file: {len(words)}")