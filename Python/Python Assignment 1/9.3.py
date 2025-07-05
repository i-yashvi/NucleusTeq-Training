def is_prime(n):
    return n > 1 and all(n % i != 0 for i in range(2, int(n**0.5) + 1))

def primes_under_100():
    for i in range(2, 100):
        if is_prime(i):
            yield i

print(list(primes_under_100()))