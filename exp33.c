//-execution always starts from main
//-a function gets called directly or indirectlyfrom main
//-there can be multiple functions in a program
//function can take value & give some value
#include<stdio.h>
int sum(int a,int b);

int main()

{
int a,b;
printf("enter first number ");

scanf("%d",&a);
printf("enter second number: ");
scanf("%d",&b);

int s = sum(a,b);
printf("sum of %d and %d is %d\n",a,b,s);
return 0;
}

int sum (int a,int b){
    return a+b;
}