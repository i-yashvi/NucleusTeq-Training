import random
number = random.randint(1, 10)
print("The number is between 1 and 10.")

while(number) :
    guess = int(input("Enter the number you are guessing: "))
    if guess < number : print(f"The number is greater than {guess}! Try again.")
    elif guess > number : print(f"The number is lesser than {guess}! Try again.")
    else : 
        print(f"Yeeaaahhhh! You guessed it right! The number is {guess}.")
        break