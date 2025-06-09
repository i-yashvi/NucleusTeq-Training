def exception_logger(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print(f"Error in function '{func.__name__}': {e}")
    return wrapper

@exception_logger
def divide(a, b):
    return a / b

divide(10, 0)  
