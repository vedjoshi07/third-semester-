//ternary operator
//syntax: condition ? expression1 : expression2

#include<stdio.h>
int main()
{
    int age;
    printf("enter your age: ");
    scanf("%d", &age);

    age >= 18 ? printf("you are eligible to vote\n") : printf("you are not eligible to vote\n");
    return 0;
}