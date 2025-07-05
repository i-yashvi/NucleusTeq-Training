def count_vowels(s):
    vowels = "aeiouAEIOU"
    sum = 0
    for x in s :
        if x in vowels : sum += 1
    return sum

string = input("Enter a string: ")
print(f"Number of vowels in {string}: {count_vowels(string)}")