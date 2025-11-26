#include <stdio.h>
#include <string.h>
#define MAX 100

char stack[MAX], inputstr[MAX];
int top = -1;

int bracketMatch(char close, char open) {
    return (open == '(' && close == ')') ||
           (open == '[' && close == ']') ||
           (open == '{' && close == '}');
}

int isOpeningB(char ch) {
    return (ch == '(' || ch == '[' || ch == '{');
}

int isClosingB(char ch) {
    return (ch == ')' || ch == ']' || ch == '}');
}

void push(char ch) {
    if (top == MAX - 1) {
        printf("❌ Stack overflow!\n");
        return;
    }
    stack[++top] = ch;
}

char pop() {
    if (top == -1) {
        return '\0';  // empty stack
    }
    return stack[top--];
}

int checkValidity() {
    for (int i = 0; inputstr[i] != '\0'; i++) {
        char ch = inputstr[i];
        if (isOpeningB(ch)) {
            push(ch);
        } else if (isClosingB(ch)) {
            if (top == -1 || !bracketMatch(ch, stack[top])) {
                return 0;  // mismatch or extra closing bracket
            }
            pop();
        }
    }
    return (top == -1);  // valid only if stack is empty at end
}

int main() {
    printf("Enter an expression to check its validity: ");
    fgets(inputstr, sizeof(inputstr), stdin);
    inputstr[strcspn(inputstr, "\n")] = '\0';  // remove newline

    if (checkValidity()) {
        printf("The entered expression is valid!\n");
    } else {
        printf("The entered expression is NOT valid!\n");
    }

    return 0;
}
