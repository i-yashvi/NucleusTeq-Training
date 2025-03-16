import java.util.Scanner;
public class Temperature {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
       
        System.out.println("Given the following options: ");
        System.out.println("1. Celsius to Fahrenheit \n2. Fahrenheit to Celsius ");
        System.out.print("Choose the operation to be performed (1/2): ");
        int option = scanner.nextInt();
        System.out.print("Enter the Temperature: ");
        int temp = scanner.nextInt();

        double temperature = 0;
        if(option == 1){
            temperature = ((temp*(9.0/5))+32);
            System.out.printf("Conversion of %.2f°C to Fahrenheit is: %.2f°F\n", (double)temp, temperature);
        }
        else if(option == 2){
            temperature = ((temp-32)*(5.0/9));
            System.out.printf("Conversion of %.2f°F to Celsius is: %.2f°C\n", (double)temp, temperature);
        }
        else{
            System.out.println("Invalid input! Enter either 1 or 2.");
        }
        
        scanner.close();
    }
}