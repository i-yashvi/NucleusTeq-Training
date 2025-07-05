import java.util.Scanner;
class Area {

    public void areaOfCircle(double radius) {
        double area = Math.PI*radius*radius;
        System.out.printf("Area of Circle is: %.2f\n", area);
    }
    public void areaOfRectangle(double length, double width) {
        double area = length*width;
        System.out.printf("Area of Rectangle is: %.2f\n", area);
    }
    public void areaOfTriangle(double height, double base) {
        double area = 0.5*height*base;
        System.out.printf("Area of Triangle is: %.2f\n", area);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        Area areaCalculator = new Area();
        System.out.print("Enter the shape to calculate the area (Circle/Rectangle/Triangle): ");
        String shapeName = scanner.nextLine().trim().toLowerCase();

        switch(shapeName) {
            case "circle":
                System.out.print("Enter the radius of circle: ");
                double radius = scanner.nextDouble();
                areaCalculator.areaOfCircle(radius);
            break;
            case "rectangle":
                System.out.print("Enter the length of rectangle: ");
                double length = scanner.nextDouble();
                scanner.nextLine();
                System.out.print("Enter the width of rectangle: ");
                double width = scanner.nextDouble();
                areaCalculator.areaOfRectangle(length, width);
            break;
            case "triangle":
                System.out.print("Enter the height of triangle: ");
                double height = scanner.nextDouble();
                scanner.nextLine();
                System.out.print("Enter the base of triangle: ");
                double base = scanner.nextDouble();
                areaCalculator.areaOfTriangle(height, base);
            break;
            default:
            System.out.println("Invalid shape name! Please enter 'Circle', 'Rectangle', or 'Triangle'.");
        }

        scanner.close();
    }
}