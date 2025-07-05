string = input("Enter a string: ")

vowels = "aeiouAEIOU"
for v in vowels : 
    string = string.replace(v, "*")
print(f"New String: {string}")