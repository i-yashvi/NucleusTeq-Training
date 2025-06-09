import importlib

def call_function(module_name, function_name):
    try:
        module = importlib.import_module(module_name)
        func = getattr(module, function_name)
        result = func()
        print("Result:", result)
    except (ModuleNotFoundError, AttributeError) as e:
        print("Error:", e)

if __name__ == "__main__":
    call_function("math", "sqrt")  
    call_function("my_module", "greet")  
