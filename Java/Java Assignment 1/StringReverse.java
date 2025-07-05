import java.util.Scanner;
public class StringReverse {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String str = scanner.nextLine();
        char[] charArray = str.toCharArray();
        int left = 0;
        int right = charArray.length-1;
        while(left<right){
            char temp = charArray[left];
            charArray[left] = charArray[right];
            charArray[right] = temp; 
            left++;
            right--;
        }
        String reversedStr = new String(charArray);
        System.out.print("Reversed string is: " + reversedStr);
        
        scanner.close();
    }
}