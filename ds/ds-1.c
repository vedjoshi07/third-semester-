#include<stdio.h>

int main()
{
    int i,arr[5];
    for (i=0;i<5;i++){
        printf("enter a number:");
        scanf("%d", &arr[i]);
    }

    for (i=0;i<5;i++){
        printf("%d ", arr[i]);
    }
}