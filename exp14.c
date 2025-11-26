#include<stdio.h>
int main()
{

    int age;

    printf ("enter your age :");
    scanf("%d",&age);
    

    if (age>18)
    {
        printf("you are eligible to vote\n");
    }
    else if (age>12 && age<18)
    {
        printf("you are a teenager\n");
    }
    else
    {
        printf("you are not eligible to vote\n");
    }

}