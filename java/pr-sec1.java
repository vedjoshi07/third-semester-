class pr2_1 {
    public static void main(String args[])
    {
     
       
       int max = Integer.parseInt(args[1]);  
       

       for (String arg : args)
        {
           int num = Integer.parseInt(arg);
           if (num > max) {
               max = num;  // Update maximum
           }
         // Sum for average calculation
       }
      
       System.out.println("Maximum: " + max);       
        
    }
    
}
