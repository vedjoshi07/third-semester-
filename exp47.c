#include<stdio.h>
int main(){
    int marks[2][3];
    marks[0][0] = 10;
    marks[0][1] = 20;
    marks[0][2] = 30;
    
    marks[1][0] = 40;
    marks[1][1] = 50;
    marks[1][2] = 60;

    printf("Marks of student 1: %d %d %d\n", marks[0][0], marks[0][1], marks[0][2]);
}