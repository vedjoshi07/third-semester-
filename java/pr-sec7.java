class pr2_7 
{

    public static void main(String[] args)
    {
        double sum = 0.0;
        int n = Integer.parseInt(args[0]);
    
        System.out.print("Harmonic series: ");

    for (int i = 1; i <= n; i++)
    {
        double term = 1.0 / i;
        sum += term;
        
        if (i == 1) 
        {
            System.out.print("1");
        } else
        {
            System.out.print(" + 1/" + i);
        }
    }
        System.out.println("\nSum: " + sum);
    }

}
    

