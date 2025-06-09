with open("example.txt", 'a') as file:
    input = input("Enter text: ")
    file.write(input + '\n')