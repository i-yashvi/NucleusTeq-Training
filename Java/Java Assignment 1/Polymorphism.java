public class Polymorphism {
    public static void main(String[] args) {
        Animal animal = new Animal();
        animal.sound(); 
        animal.sound("loud");

        Dog dog = new Dog();
        dog.sound(); 
        dog.sound("loud"); 
        dog.sound("loud", 3); 
    }
}

class Animal {
    public void sound() {
        System.out.println("The animal makes a sound.");
    }

    public void sound(String loudness) {
        System.out.println("The animal makes a " + loudness + " sound.");
    }
}

class Dog extends Animal {
    public void sound(String loudness, int frequency) {
        System.out.println("The dog barks " + loudness + " and " + frequency + " times.");
    }
}
