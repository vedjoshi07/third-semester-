class PR4_1 {
    public static void main(String[] args) {
       
        int rollNumber = Integer.parseInt(args[0]); // Roll number as int
        String name = args[1];                      // Name as String
        String course = args[2];                    // Course as String
        int semester = Integer.parseInt(args[3]);   // Semester as int

        // Print all details in one line
        System.out.println("Roll Number: " + rollNumber + 
                           ", Name: " + name + 
                           ", Course: " + course + 
                           ", Semester: " + semester);
    }
}

