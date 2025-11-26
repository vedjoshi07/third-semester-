#include<stdio.h>
int main()
{
    int y = 20;
    int x = 10;

    int smallest = (x < y) ? x : y;
    printf("Smallest number is: %d\n", smallest);

    return 0;
}
