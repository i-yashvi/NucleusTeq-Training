public class ArraySort {
    public static void main(String[] args) {
        
        int[] array = {1, 5, 9, 19, 11, 15, 76, 91, 67, 2, 33};
        System.out.print("The given array is: ");
        for (int i : array) {
            System.out.print(i + " ");
        }
        System.out.println();
        int temp = array[0];
        for(int i=0; i<array.length-1; i++){       //Bubble Sort
            for(int j=0; j<array.length-i-1; j++){
                if(array[j+1]<array[j]){
                    temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
        System.out.print("The given array in ascending order is: ");
        for (int i : array) {
            System.out.print(i + " ");
        }

    }
}