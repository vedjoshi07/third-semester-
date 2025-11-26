#include<stdio.h>
//operator precedence (*,/,%, +, -,=)
int main()
{
    int a = 10,
        b = 20,
        c = 30,

        x =a/2 - b * c + 5;
    printf("x=%d\n", x); // Print the value of x
    return 0; // Return success
}        