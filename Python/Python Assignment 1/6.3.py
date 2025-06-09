with open("example.txt", 'r') as src, open("example1.txt", 'w') as dest:
    dest.write(src.read())