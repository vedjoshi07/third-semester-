#include<stdio.h>
int main(){
    int a=10;
    int *ptr;
    ptr = &a;//ptr is a pointer which stores the address of variable a.

    printf("address of a is = %p",ptr);

    return 0;
}