import java.util.Scanner;
public class MultiplicationTable {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter the number of which, you want to get the table: ");
        int number = scanner.nextInt();

        System.out.println("Table of " + number + " is: ");
        for(int i=1; i<=10; i++){
            System.out.print(number*i + " ");
        }

        scanner.close();
    }
}