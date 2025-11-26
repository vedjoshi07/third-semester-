class pr2_5 {

    public static void main(String args[])
    {
        int no = Integer.parseInt(args[0]);

        int sum = 0;
        while (no != 0) {
            sum += no % 10;
            no /= 10;
        }
        System.out.println("Sum of digits: " + sum);


    }
    
}
