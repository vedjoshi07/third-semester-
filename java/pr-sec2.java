class pr2_2 {

    public static void main(String args[])
    {
        int a = Integer.parseInt(args[0]);
        int b = Integer.parseInt(args[1]);

        int sum = a + b;  // Calculate sum
        int product = a * b;  // Calculate product
        int difference = a - b;  // Calculate difference
        int quotient = a / b;  // Calculate quotient
        int modulus = a % b;  // Calculate modulus
        
        System.out.println("sum: " + sum);
        System.out.println("product: " + product);
        System.out.println("difference: " + difference);
        System.out.println("quotient: " + quotient);
        System.out.println("modulas: " + modulus);


    }
    
}
