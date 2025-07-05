import java.util.Scanner;

public class Student {
    private String name;
    private int rollNumber;
    private double marks;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getRollNumber() {
        return rollNumber;
    }
    public void setRollNumber(int rollNumber) {
        this.rollNumber = rollNumber;
    }

    public double getMarks() {
        return marks;
    }
    public void setMarks(double marks) {
        this.marks = marks;
    }

    public String calculateGrade() {
        if (marks >= 90) {
            return "A";
        } else if (marks >= 80) {
            return "B";
        } else if (marks >= 70) {
            return "C";
        } else if (marks >= 60) {
            return "D";
        } else {
            return "F";
        }
    }

    public void displayDetails() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marks);
        System.out.println("Grade: " + calculateGrade());
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        Student student = new Student();

        System.out.print("Enter the student name: ");
        student.setName(scanner.nextLine());
        System.out.print("Enter the student roll number: ");
        student.setRollNumber(scanner.nextInt());
        scanner.nextLine(); 
        System.out.print("Enter the student marks: ");
        student.setMarks(scanner.nextDouble());
        scanner.nextLine(); 

        student.displayDetails();

        scanner.close();
    }
}