#include<stdio.h>
int main(){
    int arr[]={1,2,3,4,5};
    printf("%d",*(arr+2));
    printf("%d",*(arr+5));
    return 0; // Accessing the third element using pointer arithmetic
}