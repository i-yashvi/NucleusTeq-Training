def word_count(s) :
    '''words = s.split()
    return len(words)'''
    count = 1
    for char in s :
        if char == ' ' : count += 1
    return count

def char_count(s) :
    '''characters = len(s)
    return len(characters)'''
    count = 0
    for char in s : 
        if char != ' ' : count += 1
    return count

def line_count(s) :
    '''lines = s.split('\n')
    return len(lines)'''
    count = 1
    for char in s :
        if char == '\n' : count += 1
    return count

string = input("Enter a sentence: ")
string.strip()

print(f"The word count is {word_count(string)}")
print(f"The character count is {char_count(string)}")
print(f"The line count is {line_count(string)}")