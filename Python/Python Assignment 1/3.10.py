import glob

def find_txt_files():
    txt_files = glob.glob("*.txt")
    if txt_files:
        print("Found .txt files:")
        for file in txt_files:
            print("-", file)
    else:
        print("No .txt files found.")

if __name__ == "__main__":
    find_txt_files()
