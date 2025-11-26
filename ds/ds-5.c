#include<stdio.h>
int main(){
    int a=10,b=20,*ptr1,*ptr2,sum;
    ptr1 = &a;
    ptr2 = &b;

    sum = *ptr1 + *ptr2;// Dereferencing pointers to get the values of a and b
    // and then adding them together.

    printf("Sum of a and b is = %d\n", sum);

    return 0;

}