import java.lang.*;

class pr7_4 implements Runnable {

    public void run() {
        System.out.println("Current running thread: " + Thread.currentThread().getName());
    }

    public static void main(String[] args) {
        try {
            Thread t1 = new Thread(new pr7_4());
            Thread t2 = new Thread(new pr7_4());
            Thread t3 = new Thread(new pr7_4());
            Thread t4 = new Thread(new pr7_4());

            t1.setPriority(Thread.MAX_PRIORITY);
            t2.setPriority(Thread.NORM_PRIORITY);
            t3.setPriority(Thread.NORM_PRIORITY);
            t4.setPriority(Thread.MIN_PRIORITY);

            t1.start();
            t2.start();
            t3.start();
            t4.start();

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
