class pr3 {
    public static void main(String args[])
     {
        float distance = Float.parseFloat(args[0]);  // Parse as float (not int)
        float time = Float.parseFloat(args[1]);     // Parse as float (not int)
        float speed = distance / time;
        System.out.println("speed is: " + speed);
    }
}