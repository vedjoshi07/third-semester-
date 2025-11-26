class pr2_6 
{
    public static void main(String args[])
    {
        int number = Integer.parseInt(args [0]); // You can change this to test other numbers
        int sum = 0;

        for (int i = 1; i < number; i++) {
            if (number % i == 0) {
            sum += i;
            }
        }

        if (sum == number) {
            System.out.println(number + " is a perfect number.");
        } else {
            System.out.println(number + " is not a perfect number.");
        }
    }
}    