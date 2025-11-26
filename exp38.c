#include <stdio.h>
void printhw(int count);
int main()
{
    printhw(5);
    return 0;
}

//recursive function
void printhw(int count){
    if (count == 0){
        return;
    }
    printf("hello world");
    printhw(count-1);
}