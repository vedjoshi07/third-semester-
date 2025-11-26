#include <stdio.h>
#include <string.h>
#include <math.h>
#define MAX 100

int stack[MAX], top = -1;

int isOperand(char c) 
{
    return (c >= '0' && c <= '9');
}

int isOperator(char c) 
{
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '%' || c == '^');
}

void push(int val) 
{
    if (top == MAX - 1) 
    {
        printf("Error: Stack overflow!\n");
        return;
    }
    stack[++top] = val;
}

int pop()
 {
    if (top == -1) 
    {
        printf("Error: Stack underflow!\n");
        return 0;
    }
    return stack[top--];
}

int evaluatePostfix(char *postfix) 
{
    int i = 0;
    while (postfix[i] != '\0') 
    {
        char symbol = postfix[i];

        if (symbol == ' ') 
        { // skip spaces
            i++;
            continue;
        }

        if (isOperand(symbol))
         {
            push(symbol - '0');  // convert char digit to int
        }
        else if (isOperator(symbol)) 
        {
            if (top < 1) 
            {
                printf("Error: Not enough operands for '%c'\n", symbol);
                return -1;
            }
            int opd2 = pop();
            int opd1 = pop();

            switch (symbol) 
            {
                case '+': push(opd1 + opd2); break;
                case '-': push(opd1 - opd2); break;
                case '*': push(opd1 * opd2); break;
                case '/':
                    if (opd2 == 0)
                     {
                        printf("Error: Division by zero!\n");
                        return -1;
                    }
                    push(opd1 / opd2);
                    break;
                case '%':
                    if (opd2 == 0) 
                    {
                        printf("Error: Modulo by zero!\n");
                        return -1;
                    }
                    push(opd1 % opd2);
                    break;
                case '^': push((int)pow(opd1, opd2)); break;
            }
        }
        else 
        {
            printf("Error: Invalid character '%c'\n", symbol);
            return -1;
        }
        i++;
    }

    if (top == 0) 
    {
        return pop();
    } else 
    {
        printf("Error: Invalid expression!\n");
        return -1;
    }
}

int main() 
{
    char postfix[MAX];

    printf("Enter postfix expression (single-digit operands only): ");
    fgets(postfix, sizeof(postfix), stdin);
    postfix[strcspn(postfix, "\n")] = '\0'; // remove newline

    int result = evaluatePostfix(postfix);
    if (result != -1) 
    {
        printf("Result = %d\n", result);
    }

    return 0;
}
