#include<stdio.h>
int main()
{
    int i;
    int sum = 0;
    for(i=5;i<=50;i++)
    {
       sum += i;
    }
    printf("The sum of integers from 5 to 50 is: %d\n",sum);
    return 0;
}