import java.util.Scanner;

public class Anagram {
    public static boolean areAnagrams(String str1, String str2) {
        if (str1 == null || str2 == null || str1.length() != str2.length()) {
            return false; // If lengths differ, they can't be anagrams
        }

        int[] charCount1 = new int[256];
        int[] charCount2 = new int[256];
        
        // Count frequency of characters in both strings
        for (int i = 0; i < str1.length(); i++) {
            charCount1[str1.charAt(i)]++;
            charCount2[str2.charAt(i)]++;
        }

        // Compare both frequency arrays
        for (int i = 0; i < 256; i++) {
            if (charCount1[i] != charCount2[i]) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter string1: ");
        String str1 = scanner.nextLine();
        System.out.print("Enter string2: ");
        String str2 = scanner.nextLine();

        if (areAnagrams(str1, str2)) {
            System.out.println(str1 + " and " + str2 + " are anagrams.");
        } else {
            System.out.println(str1 + " and " + str2 + " are not anagrams.");
        }
        
        scanner.close();
    }
}
