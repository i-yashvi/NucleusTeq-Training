class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# Usage
dog = Dog()
cat = Cat()
print(dog.speak())  
print(cat.speak()) 