def power_function(n):
    return lambda x: x ** n

square = power_function(5)
cube = power_function(8)

print(square(4))  
print(cube(2))    