def is_palindrome(s):
    return s == s[::-1]

string = input("Enter a string: ")
max_palindrome = ""

for i in range(len(string)):
    for j in range(i + 1, len(string) + 1):
        substring = string[i:j]
        if is_palindrome(substring) and len(substring) > len(max_palindrome):
            max_palindrome = substring
       
print(f"Longest palindromic string is: {max_palindrome}")