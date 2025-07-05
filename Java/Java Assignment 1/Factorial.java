import java.util.Scanner;
//import java.math.BigInteger;
class Factorial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int number = scanner.nextInt();

        long factorial = 1;
        //BigInteger factorial = BigInteger.ONE;
        for(int i=1; i<=number; i++){
            factorial = i*factorial;
            //factorial = factorial.multiply(BigInteger.valueOf(i));
        }
        System.out.println("The factorial of " + number + " is: " + factorial);

        scanner.close();
    }
}