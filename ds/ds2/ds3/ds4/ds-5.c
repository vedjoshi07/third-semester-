#include <stdio.h>

void towerOfHanoi(int n, char src, char helper, char dest) 
{
    if (n == 1) 
    {
        printf("Move disc 1 from %c to %c\n", src, dest);
        return;
    }
    towerOfHanoi(n - 1, src, dest, helper);
    printf("Move disc %d from %c to %c\n", n, src, dest);
    towerOfHanoi(n - 1, helper, src, dest);
}

int main() 
{
    int n;
    printf("Enter number of discs: ");
    scanf("%d", &n);

    if (n <= 0) 
    {
        printf("Invalid number of discs!\n");
        return 1;
    }

    printf("\nSteps to solve Tower of Hanoi with %d discs:\n", n);
    towerOfHanoi(n, 'A', 'B', 'C');

    return 0;
}
