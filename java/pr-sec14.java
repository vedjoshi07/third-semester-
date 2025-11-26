class pr2_14 
{
 public static void main(String[] args)
 {
    int a = 5;
    float b = (float)2.5;
    float c = (float)4.0;
    
    // Operator precedence: Multiplication (*) has higher precedence than addition (+)
    // So, b * c is evaluated first, then added to a
    System.out.println(a + b * c);
    
    // Operator precedence: Pre-increment (++a) is evaluated first, 
    // then multiplication (*), and finally subtraction (-)
    System.out.println(++a * b - c);
    
    // Operator precedence: Division (/) is evaluated first, 
    // then addition (+)
    System.out.println(a / b + c);
 }   
}
