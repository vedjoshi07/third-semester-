import java.util.*;

class pr7_2 {
    static class sumTask implements Runnable {
        @Override
        public void run() {
            int sum = 0;
            for(int i = 1; i <= 5; i++) {
                sum += i;
            }
            System.out.println("Sum of first 5 natural numbers: " + sum + " by thread: " + Thread.currentThread().getName());
        }
    }
    
    static class factorial implements Runnable {
        private int n;
        
        factorial(int n) {
            this.n = n;
        }
        
        @Override
        public void run() {
            int fact = 1;
            for(int i = n; i > 0; i--) {
                fact *= i;
            }
            System.out.println("Factorial of " + n + " = " + fact + " by thread: " + Thread.currentThread().getName());
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number to find factorial: ");
        int n = sc.nextInt();
        
        Thread t1 = new Thread(new sumTask());
        Thread t2 = new Thread(new factorial(n));
        
        t1.start();
        t2.start();
        
        sc.close();
    }
}