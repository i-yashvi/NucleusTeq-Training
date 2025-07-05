import java.util.Scanner;
public class Operators {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Enter any two numbers: ");
        int a = scanner.nextInt();
        int b = scanner.nextInt();

        System.out.println("Example of Arithmetic Operators: ");
        System.out.println("Addition: " + (a+b));
        System.out.println("Subtraction: " + Math.abs(a-b));
        System.out.println("Multiplication: " + (a*b));
        System.out.println("Division: " + (double) a/b);
        System.out.println("Modulus: " + (a%b) + "\n");

        System.out.println("Example of Relational Operators: ");
        System.out.println(a + " equals to (==) " + b + "? " + (a==b));
        System.out.println(a + " not equals to (!=) " + b + "? " + (a!=b));
        System.out.println(a + " greater than (>) " + b + "? " + (a>b));
        System.out.println(a + " less than (<) " + b + "? " + (a<b));
        System.out.println(a + " greater than or equals to (>=) " + b + "? " + (a>=b));
        System.out.println(a + " less than or equals to (<=) " + b + "? " + (a<=b) + "\n");

        System.out.print("Enter a third number: ");
        int c = scanner.nextInt();
        System.out.println("Example of Logical Operators: ");
        System.out.println(a + " is greater than " + b + " and (&&) " + a + " is less than " + c + "? " + ((a>b) && (a<c)));
        System.out.println(a + " is greater than " + b + " or (||) " + a + " is less than " + c + "? " + ((a>b) || (a<c)));
        System.out.println("Reverse (!) of " + a + " is greater than " + b + ": " + !(a>b));

        scanner.close();
    }
}
