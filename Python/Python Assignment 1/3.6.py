import argparse

def main():
    parser = argparse.ArgumentParser(description="Simple CLI Calculator")
    parser.add_argument("num1", type=float, help="First number")
    parser.add_argument("op", choices=["add", "sub", "mul", "div"], help="Operation")
    parser.add_argument("num2", type=float, help="Second number")

    args = parser.parse_args()

    if args.op == "add":
        result = args.num1 + args.num2
    elif args.op == "sub":
        result = args.num1 - args.num2
    elif args.op == "mul":
        result = args.num1 * args.num2
    elif args.op == "div":
        result = args.num1 / args.num2 if args.num2 != 0 else "Error: Division by zero"

    print("Result:", result)

if __name__ == "__main__":
    main()