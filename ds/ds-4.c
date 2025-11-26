#include<stdio.h>

int main()
{
    int min,max,avg,i,arr[5];

    for (i=0;i<5;i++)
    {
        printf("enter a number: ");
        scanf("%d", &arr[i]);
    }

    min = arr[0];
    max = arr[0];
    avg = 0;

    for (i=0;i<5;i++)
    {
        if (arr[i] < min) // here first i=0 and then it takes 5 then its checks 4<5 or not if yes then min=4 ans so on.
        {
            min = arr[i];
        }
        if (arr[i] > max) //same for max if 5>0 then it takes 5 then 6>5 so it takes 6 as max and so on.
        {
            max = arr[i];
        }

        avg += arr[i];// first it do sum of 5 numbers here.
    }

        avg /= 5;//it will devide sum by 5.

        printf("Minimum: %d\n", min);
        printf("Maximum: %d\n", max);
        printf("Average: %d\n", avg);
        
    return 0;
}