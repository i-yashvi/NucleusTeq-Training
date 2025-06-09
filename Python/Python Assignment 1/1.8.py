print("Given the following options: ")
print("1. Celsius to Fahrenheit \n2. Fahrenheit to Celsius ")
option = int(input("Choose the operation to be performed (1/2): "))
temp = float(input("Enter the Temperature: "))

temperature = 0
if option == 1 :
    temperature = ((temp*(9.0/5))+32)
    print(f"Conversion of {temp}°C to Fahrenheit is: {temperature}")
elif option == 2 : 
    temperature = ((temp-32)*(5.0/9))
    print(f"Conversion of {temp}°C to Fahrenheit is: {temperature}")
else :
    print("Invalid input! Enter either 1 or 2.")