import java.util.Scanner;
public class ArrayAverage {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int[] array;
        System.out.print("Enter size of array: ");
        int size = scanner.nextInt();
        array = new int[size];
        System.out.println("Enter " + size + " array elements: ");
        for(int i=0; i<size; i++){
            array[i] = scanner.nextInt();
        }
        double avg = 0; 
        int sum = 0;
        for(int i : array){
            sum += i;
        }
        avg = (double) sum/size;
        System.out.printf("Average of the array is: %.2f", avg);

        scanner.close();
    }
}
