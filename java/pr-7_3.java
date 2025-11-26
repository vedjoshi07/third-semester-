import java.lang.*;

class pr7_3 {

    static class task1 implements Runnable {
        public void run() {
            System.out.println("Message by Thread: " + Thread.currentThread().getName());
            
            for (int i = 1; i < 11; i++) {
                System.out.print(i + " ");
                try {
                    if (i == 3) {
                        Thread.sleep(1000);  // pause for 1 second
                    }
                } catch (InterruptedException Ie) {
                    System.out.println("Exception occurred while multitasking: " + Ie);
                    return;
                }
            }
            System.out.println();
        }
    }

    static class task2 implements Runnable {
        public void run() {
            System.out.println("Running thread: " + Thread.currentThread().getName());
        }
    }

    public static void main(String[] args) {
        Thread t1 = new Thread(new task1());
        Thread t2 = new Thread(new task2());

        t1.setPriority(Thread.MIN_PRIORITY);
        t2.setPriority(Thread.MAX_PRIORITY);

        t1.start();
        t2.start();
    }
}
