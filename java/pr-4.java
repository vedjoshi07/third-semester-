class pr4 {
    public static void main(String args[]) {
        int rollNumber = Integer.parseInt(args[0]);  // Parse roll number as int
        String name = args[1];  // Name as String
        String course = args[2];  // Course as String
        int semester = Integer.parseInt(args[3]);  // Parse semester as int
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Name: " + name);
        System.out.println("Course: " + course);
        System.out.println("Semester: " + semester);

    }
}
