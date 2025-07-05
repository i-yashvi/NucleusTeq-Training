class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades

    def average(self):
        return sum(self.grades) / len(self.grades)

# Usage
s = Student("Yashvi", [80, 90, 98])
print(s.average())  