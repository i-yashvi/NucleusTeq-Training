def cipher(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            result += chr((ord(char) + shift - base) % 26 + base)
        else:
            result += char
    return result

shift = int(input("Enter the shift: "))
text = input("Enter the text: ")
print(f"Text converted to cipher: {cipher(text, shift)}")