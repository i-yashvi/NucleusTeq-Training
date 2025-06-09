words = ["madam", "name", "isi", "yashvi"]
palindromes = (w for w in words if w == w[::-1])

print(list(palindromes))
