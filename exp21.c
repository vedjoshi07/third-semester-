#include<stdio.h>
int main()
{
int n;
printf("enter a number: ");
scanf("%d", &n);

int sum = 0;
for (int j=n; j>=1; j--) {
    sum += j;
    printf("%d ", j);
}

printf("The sum of numbers is: %d\n",sum);


return 0;
}