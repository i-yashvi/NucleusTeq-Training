def currency_format(number) :
    number_str = str(number)
    result = ""
    while len(number_str) > 3 :
        result = "," + number_str[-3:] + result
        number_str = number_str[:-3]
    result = number_str + result
    return result

number = int(input("Enter a number: "))
#print("{:,}".format(number))
print(currency_format(number))