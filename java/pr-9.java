class pr9 {
    public static void main(String args[]) {
        double a = Double.parseDouble(args[0]);
        double b = Double.parseDouble(args[1]);
        double c = Double.parseDouble(args[2]);

        double d = b * b - 4 * a * c;

        if (d >= 0) {
            double root1 = (-b + Math.sqrt(d)) / (2 * a);
            double root2 = (-b - Math.sqrt(d)) / (2 * a);
            System.out.println(d == 0 ? "One real root: " + root1 : "Two real roots: " + root1 + " and " + root2);
        } 
        else {
            double realPart = -b / (2 * a);
            double imaginaryPart = Math.sqrt(-d) / (2 * a);
            System.out.println("Complex roots: " + realPart + " ± " + imaginaryPart + "i");
        }
    }
}
