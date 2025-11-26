//control instructions:-
// - sequence control
// - decision control
// - loop control
// - case control

#include <stdio.h>
int main() {
    int a = 10, b = 20, c = 30;
    int x = a / 2 - b * c + 5; // Calculate x using operator precedence
    printf("x=%d\n", x); // Print the value of x
    return 0; // Return success
}