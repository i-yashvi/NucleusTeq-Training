class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

class Member:
    def __init__(self, name):
        self.name = name
        self.borrowed = []

    def borrow(self, book):
        self.borrowed.append(book)

b1 = Book("2008", "No Exit")
m1 = Member("Yashvi")
m1.borrow(b1)
print(m1.borrowed[0].title) 
