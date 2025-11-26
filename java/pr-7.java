class pr7{
    public static void main(String args[]){
        int c = Integer.parseInt(args[0]);  // Parse as int (not float)
        float F = (float)((c * 1.8) + 32);

        System.out.println("Temperature in Fahrenheit: " + F);

    }
}