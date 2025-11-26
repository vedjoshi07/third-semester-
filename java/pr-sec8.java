class pr2_8
{
    public static void main(String args[])
    {
    
        int n = Integer.parseInt(args[0]);
        
        for (int i = 1; i <= Math.sqrt(n); i++) 
        {
            if (n % i == 0) 
            {
                System.out.print(i + ", ");   
                if (i != n / i) 
                {                    
                    System.out.print(n / i + ", "); 
                }
            }
        }
    }
}