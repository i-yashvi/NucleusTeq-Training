import java.util.Scanner;
public class LinearSearch {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int[] array = { 1, 5, 9, 19, 11, 15, 33, 91, 67, 2, 76};
        System.out.print("Enter element to search in the array: ");
        int key = scanner.nextInt();
        scanner.close();
        
        int index = 0;
        for (int i : array) {
            if(i == key){
                System.out.println(key + " is found at " + (index+1) + "th position in the array!");
                return;
            }
            index++;
        }
        System.out.println(key + " is not found in the array!");
    }
}
