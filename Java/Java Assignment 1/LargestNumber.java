import java.util.Scanner;
public class LargestNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter any three numbers: ");
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        int c = scanner.nextInt();

        if (a>=b && a>=c) { 
            System.out.println(a + " is the largest number of all."); 
        }
        else if (b>=a && b>=c){
            System.out.println( b + " is the largest number of all."); 
        }
        else {
            System.out.println(c + " is the largest number of all."); 
        }
        
        scanner.close();  
    }
}
