import java.util.Scanner;
public class PrimeNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter number to check if it's prime or not: ");
        int number = scanner.nextInt();

        boolean isPrime = true;
        if(number<=1){
            isPrime = false;
        }
        else{
            for(int i=2; i<=Math.sqrt(number); i++){
                if(number%i == 0){
                    isPrime = false;
                    break;
                }
            }
        }
        if(isPrime)
        System.out.println("The number " + number + " is Prime Number.");
        else
        System.out.println("The number " + number + " is not a Prime Number.");
    
        scanner.close();
    }
}
