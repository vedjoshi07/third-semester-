#include<stdio.h>

float converttemp(float n);

int  main (){
    float far = converttemp(0);
    printf("Temperature in Celsius: %.2f\n", far);
    return 0;
}

float converttemp(float n){
    float far = n * 9 / 5 + 32;
    return far;
}