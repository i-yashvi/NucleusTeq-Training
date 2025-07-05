with open("merged_file.txt", 'w') as merged_file:
    for file in ["example.txt", "example1.txt"]:
        with open(file, 'r') as files:
            merged_file.write(files.read() + '\n')