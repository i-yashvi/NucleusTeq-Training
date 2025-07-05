try:
    #f = open("example.txt", "r")
    f = open("example123.txt", "r")
    content = f.read()
except FileNotFoundError:
    print("File not found!")
finally:
    try:
        f.close()
    except NameError:
        pass