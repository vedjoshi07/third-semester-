class pr7_1 implements Runnable
{
    public void run()
    {
    for(int i = 1; i < 6; i++)
    {
    System.out.print(i+" ");
    }
    System.out.println();
    }
    public static void main(String[] args) 
    {
    Thread t = new Thread(new pr7_1());
    t.start();
    }
}