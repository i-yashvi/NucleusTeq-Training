def is_palindrome(s):
    s = s.lower().replace(" ", "")
    left = 0
    right = len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

string = input("Enter a string: ")
print(f"The string '{string}', is a Palindrome!" if is_palindrome(string) 
      else f"The string '{string}', is not a palindrome.")