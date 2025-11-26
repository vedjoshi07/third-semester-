#include <stdio.h>
#include <string.h>
#define MAX 100

int top = -1;
char stack[MAX], str[100];

void push(char val) {
    if (top == MAX - 1) {
        printf("Stack overflow!\n");
        return;
    }
    stack[++top] = val;
}

char pop() {
    if (top == -1) {
        return '\0';
    }
    return stack[top--];
}

int isValid(int idx) {
    idx++;  
    while (str[idx] != '\0') {
        char ch = pop();
        if (ch == '\0' || str[idx] != ch) {
            return 0;  
        }
        idx++;
    }
    return (top == -1);  
}

int main() {
    printf("Enter a string of the form {w C wR}, where w ∈ {a,b}* :\n");
    fgets(str, sizeof(str), stdin);
    str[strcspn(str, "\n")] = '\0';  

    int len = strlen(str);
    if (len == 0) {
        printf("Invalid: Empty string!\n");
        return 0;
    }

    char *posC = strchr(str, 'C');
    if (posC == NULL) {
        printf("Invalid: No 'C' separator found!\n");
        return 0;
    }

    int idxC = posC - str;

    for (int i = 0; i < len; i++) {
        if (str[i] != 'a' && str[i] != 'b' && str[i] != 'C') {
            printf("Invalid: String contains characters outside {a,b,C}!\n");
            return 0;
        }
    }

    for (int i = 0; i < idxC; i++) {
        push(str[i]);
    }

    if (isValid(idxC)) {
        printf("The entered string is VALID (matches w C wR).\n");
    } else {
        printf("The entered string is NOT valid.\n");
    }

    return 0;
}
