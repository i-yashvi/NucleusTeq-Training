class Task1 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Task 1: " + i);
            try {
                Thread.sleep(1000); // sleep for 1 second
            } catch (InterruptedException e) {
                System.out.println("Task 1 interrupted.");
            }
        }
    }
}

class Task2 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Task 2: " + i);
            try {
                Thread.sleep(1000); // sleep for 1 second
            } catch (InterruptedException e) {
                System.out.println("Task 2 interrupted.");
            }
        }
    }
}

public class Multithreading {
    public static void main(String[] args) {
        Task1 task1 = new Task1();
        Task2 task2 = new Task2();

        task1.start();
        task2.start();
    }
}

//Alternative Approach using Runnable:

/* class Task1 implements Runnable {
    @Override
    public void run() {
        // task code here
    }
}

class Task2 implements Runnable {
    @Override
    public void run() {
        // task code here
    }
}

public class Multithreading {
    public static void main(String[] args) {
        Task1 task1 = new Task1();
        Task2 task2 = new Task2();

        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);

        thread1.start();
        thread2.start();
    }
} */