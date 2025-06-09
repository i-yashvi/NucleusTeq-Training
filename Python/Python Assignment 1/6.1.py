with open("example.txt", "r") as file: 
    for i, line in enumerate(file, start=1):
            print(f"{i}: {line}", end='')