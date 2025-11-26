class pr2_10 {
    public static void main(String[] args) {
        // Widening typecasting (smaller to larger type)
        int intnum = 25;
    // Widening typecasting (int to float)
    float floatnum = intnum;
    System.out.println("Widening int to float: " + floatnum);

    // Widening typecasting (float to double)
    double doublenum = floatnum;
    System.out.println("Widening float to double: " + doublenum);

    // Narrowing typecasting (double to float)
    float narrowedFloat = (float) doublenum;
    System.out.println("Narrowing double to float: " + narrowedFloat);

    // Narrowing typecasting (float to int)
    int narrowedInt = (int) narrowedFloat;
    System.out.println("Narrowing float to int: " + narrowedInt);
    }
}
