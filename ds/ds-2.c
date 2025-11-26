//here the logic is like this:-fibonacci(5)
// = fibonacci(4) + fibonacci(3)
// = (fibonacci(3) + fibonacci(2)) + (fibonacci(2) + fibonacci(1))
// = ((fibonacci(2) + fibonacci(1)) + (fibonacci(1) + fibonacci(0))) + ((fibonacci(1) + fibonacci(0)) + 1)
// = ((1 + 1) + (1 + 0)) + ((1 + 0) + 1)
// = (2 + 1) + (1 + 1)
// = 3 + 2
// = 5
#include<stdio.h>

int fib(int n) 
{
    if(n == 0)//if n = 0 so it will return 0.
        return 0;
    else if(n == 1)//if n = 1 so it will return 1.
        return 1;
    else
        return fib(n - 1) + fib(n - 2);//if n is greater than 1 then it will return the sum of the previous two terms.
        //for example if n = 5 then it will return fib(4) + fib(3) and so on until it reaches the base cases.
        //this is a recursive function which calls itself until it reaches the base cases.
}

int main() {
    int n;
    printf("Enter the value of n: ");//prompting user to enter the value of n.
    scanf("%d", &n);

    int result = fib(n);//calling the fib function with the value of n to get the nth term of the Fibonacci series.
    printf("The %dth term of the Fibonacci series is: %d\n", n, result);

    return 0;
}
