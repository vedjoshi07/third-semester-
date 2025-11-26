#include<stdio.h>

int fibo(int n);

int main(){

    printf("%d",fibo(6));
    
    return 0;
}
int  fibo(int n){
    if(n == 0)
        return 0;
    if(n == 1)
        return 1;    

    int fibo1 = fibo(n-1);
    int fibo2 = fibo(n-2);
    int fibon = fibo1 + fibo2;
    printf("fib of %d is %d\n", n, fibon);
    return fibon;
}