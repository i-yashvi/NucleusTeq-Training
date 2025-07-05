import java.util.Scanner;
public class Fibonacci {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the number of terms until which you want the Fibonacci series: ");
        int number = scanner.nextInt();

        int firstTerm = 0;
        int secondTerm = 1;
        if(number==1){
            System.out.println("Fibonacci series: " + firstTerm);
        }
        else if (number==2){
            System.out.println("Fibonacci series: " + firstTerm + " " + secondTerm);
        }
        else{
            System.out.print("Fibonacci series: " + firstTerm + " " + secondTerm + " ");
            for(int i=3; i<=number; i++){
                int nextTerm = firstTerm + secondTerm;
                System.out.print(nextTerm + " ");
                firstTerm = secondTerm;
                secondTerm = nextTerm;
            }
        }
        
        scanner.close();
    }
}
