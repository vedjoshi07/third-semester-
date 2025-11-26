#include<stdio.h>
int main()
{
    int n;
    do
    {
        printf("Enter a number: ");
        scanf("%d", &n);
        if (n % 7 == 0) // Check if the number is a multiple of 7
        {
            break;
        }
        printf("%d\n", n);
    }
    while(1);
    printf("Thanks\n");
    return 0;
}