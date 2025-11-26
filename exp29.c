#include <stdio.h>
int main()
{
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);

    int i;
    for(i=10;i>=1;i--)
    {
        printf("%d\n", n * i);
    } 

    return 0;
}