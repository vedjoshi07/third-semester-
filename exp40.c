#include <stdio.h>

int fact(int n);

int main(){
    printf("Factorial of 5 is: %d\n", fact(5));
    return 0;
}

int fact(int n){
    if (n == 0){
        return 1;
    }
    int factnum1 = fact(n-1);
    int factn = factnum1 * n;
    return factn;
}