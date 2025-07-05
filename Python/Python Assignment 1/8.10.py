class NegativeAmountError(Exception): pass
class InsufficientFundsError(Exception): pass

class Wallet:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount < 0:
            raise NegativeAmountError("Cannot withdraw negative amount")
        if amount > self.balance:
            raise InsufficientFundsError("Not enough balance")
        self.balance -= amount

try:
    w = Wallet(100)
    w.withdraw(150)
except NegativeAmountError as e:
    print(e)
except InsufficientFundsError as e:
    print(e)