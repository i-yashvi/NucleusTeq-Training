import os
import sys

def list_files():
    print("Files in current directory:")
    for filename in os.listdir("."):
        if os.path.isfile(filename):
            print("-", filename)

def print_args():
    print("\nCommand-line arguments:")
    for i, arg in enumerate(sys.argv):
        print(f"arg[{i}] = {arg}")

if __name__ == "__main__":
    list_files()
    print_args()