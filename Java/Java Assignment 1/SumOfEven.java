public class SumOfEven {
    public static void main(String[] args) {
        
        int sum = 0;
        int number = 1;
        while(number <= 10){
            if(number%2 == 0){
                sum += number;
            }
            number++;
        }
        System.out.println("Sum of all even numbers from 1 to 10 is: " + sum);

    }
}
