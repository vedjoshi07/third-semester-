#include <stdio.h>
int main()
{
    int a=22;
    int b=a;
    int c=b+1;
    int d=1,e;

    a=b=c=1;

    printf("a=%d b=%d c=%d d=%d e=%d\n", a, b, c, d, e);
}