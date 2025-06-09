old = input("Enter the word to be replaced: ")
new = input("Enter the new word: ")

with open("example.txt", 'r') as file:
    content = file.read()
    content = content.replace(old, new)

with open("example.txt", 'w') as file:
    file.write(content)