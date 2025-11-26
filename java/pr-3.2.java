class pr3sec {
    public static void main(String[] args) {
        float P = Float.parseFloat(args[0]);  // Parse as float (not int)
        float R = Float.parseFloat(args[1]);  // Parse as float (not int
        float T = Float.parseFloat(args[2]);
          // Parse as float (not int)    // Parse as float (not int)
        float SimpleInterest = (P * R * T) / 100;
        System.out.println("Simple Interest is: " + SimpleInterest);
    }
    
}
