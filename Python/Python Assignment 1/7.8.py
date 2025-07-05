class Person:
    def __init__(self, name):
        self.__name = name  

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

# Usage
p = Person("Yashvi")
print(p.get_name())   
p.set_name("Mudgal")
print(p.get_name())  