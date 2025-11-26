class pr2_9 
{
    public static void main(String args[])
    {
        int max = Integer.parseInt(args[0]);
        int min = Integer.parseInt(args[0]);
        int n = args.length;
        
        for (int i = 1; i < n; i++) 
        {
            int num = Integer.parseInt(args[i]);
            
            if (num > max) 
            {
                max = num;
            }
            else 
            {
                if (num < min) 
                {
                    min = num;
                }
            }
        }
        
        System.out.println("Maximum: " + max);
        System.out.println("Minimum: " + min);
    }
}