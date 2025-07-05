def compressed_string(s): 
    result = ""
    count = 1

    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            count += 1
        else:
            result += (s[i-1] + str(count))
            count = 1
    result += (s[-1] + str(count))

    return result
        

string = input("Enter a string: ")
print(f"Compressed string is: {compressed_string(string)}")