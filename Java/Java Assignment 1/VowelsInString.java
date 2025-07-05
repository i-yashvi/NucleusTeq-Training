import java.util.Scanner;
public class VowelsInString {
    public static int countVowels(String str) {
        if (str == null || str.isEmpty()) {
            return 0; 
        }
        
        int count = 0;
        str = str.toLowerCase(); 
        
        for (char ch : str.toCharArray()) {
            if ("aeiou".indexOf(ch) != -1) { 
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String input = scanner.nextLine();
        System.out.println("Number of vowels in the entered string are: " + countVowels(input));

        scanner.close();
    }
}