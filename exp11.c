#include<stdio.h>
int main()
{
    int x;
    printf("enter value of x:");
    scanf("%d",&x);
    printf("%D\n",(9<x) && (x<100));
    return 0;
}