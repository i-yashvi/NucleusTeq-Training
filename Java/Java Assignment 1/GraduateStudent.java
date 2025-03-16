//Inheritance
public class GraduateStudent extends Student {
    private String researchTopic;
    private String supervisorName;

    public String getResearchTopic() {
        return researchTopic;
    }
    public void setResearchTopic(String researchTopic) {
        this.researchTopic = researchTopic;
    }

    public String getSupervisorName() {
        return supervisorName;
    }
    public void setSupervisorName(String supervisorName) {
        this.supervisorName = supervisorName;
    }

    public void displayResearchDetails() {
        System.out.println("Research Topic: " + researchTopic);
        System.out.println("Supervisor Name: " + supervisorName);
    }

    public static void main(String[] args) {
        GraduateStudent graduateStudent = new GraduateStudent();

        graduateStudent.setName("Yashvi");
        graduateStudent.setRollNumber(12345);
        graduateStudent.setMarks(95);

        graduateStudent.setResearchTopic("Artificial Intelligence");
        graduateStudent.setSupervisorName("Dr. Smita Jain");

        graduateStudent.displayDetails();
        graduateStudent.displayResearchDetails();
    }
}
