import java.util.Scanner;
public class Patterns {

    public void squarePattern(int rows) {
        for(int i=1; i<=rows; i++){
            for(int j=1; j<=rows; j++){
                if(i==1 || i==rows || j==1 || j==rows){
                    System.out.print("* ");
                }
                else{
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }

    public void trianglePattern(int rows) {
        for(int i=1; i<=rows; i++){

            if(i==rows){
                for(int j=1; j<=rows; j++){
                    System.out.print("* ");
                }
                break;
            }
            for (int j = i; j < rows; j++) {
                System.out.print(" ");
            }

            for (int k = 1; k <= (2 * i - 1); k++) {
                if (k == 1 || k == (2 * i - 1)) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }

            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Patterns pattern = new Patterns();

        System.out.print("Enter the shape to print the pattern (Square/Triangle): ");
        String shapeName = scanner.nextLine().trim().toLowerCase();
        System.out.print("Enter the number of rows for the pattern: ");
        int rows = scanner.nextInt();

        if(shapeName.equals("square")){
            pattern.squarePattern(rows);
        }
        else if(shapeName.equals("triangle")){
            pattern.trianglePattern(rows);
        }
        else{
            System.out.println("Invalid shape name! Please enter 'Square' or 'Triangle'.");
        }

        scanner.close();
    }
}