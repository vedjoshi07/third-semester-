class pr2_11a {
    public static void main(String[] args) {
        int n = Integer.parseInt(args[0]); // You can change this value to any positive integer

        System.out.println("Prime numbers between 1 and " + n + " are:");

        // Using a for loop to iterate through numbers
        for (int i = 2; i <= n; i++) {
            boolean isPrime = true;

            int j = 2;

            while (j <= Math.sqrt(i)) 
            {
                if (i % j == 0) 
                {
                    isPrime = false;
                    break;
                }
                j++;
            }

            // Using a do-while loop to print the prime number
            if (isPrime) 
            {
                int temp = i; // Temporary variable for demonstration
                do 
                {
                    System.out.print(temp + " ");
                } 
                while (false); // Ensures the loop runs only once
            }
        }
    }
}
