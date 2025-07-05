class CharIterable:
    def __init__(self, text):
        self.text = text

    def __iter__(self):
        return iter(self.text)

for char in CharIterable("Hello"):
    print(char)