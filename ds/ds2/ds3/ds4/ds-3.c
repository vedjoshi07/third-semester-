#include <stdio.h>
#include <string.h>
#define MAX 100

char input[MAX], stack[MAX], output[MAX];
int topStack = -1, outLen = 0;

void pushStack(char c) 
{
    if (topStack == MAX - 1) 
    {
        printf("Error: Stack overflow!\n");
        return;
    }
    stack[++topStack] = c;
}

char popStack() 
{
    if (topStack == -1) 
    {
        return '\0';
    }
    return stack[topStack--];
}

int isOperator(char c) 
{
    return (c == '+' || c == '-' || c == '*' || c == '/' || c == '%' || c == '^');
}

int precedence(char op) 
{
    switch (op) {
        case '^': return 3;
        case '*': case '/': case '%': return 2;
        case '+': case '-': return 1;
        default: return 0;
    }
}

int isLeftAssociative(char op) 
{
    return (op != '^'); // ^ is right-associative
}

void appendOutput(char c) 
{
    output[outLen++] = c;
    output[outLen] = '\0';
}

void infixToPostfix() 
{
    for (int i = 0; input[i] != '\0'; i++) 
    {
        char c = input[i];

        if (c == ' ') continue; // skip spaces

        if ((c >= 'a' && c <= 'z') || 
            (c >= 'A' && c <= 'Z') || 
            (c >= '0' && c <= '9'))
        {
            appendOutput(c); // operand directly to output
        }
        else if (c == '(') 
        {
            pushStack(c);
        }
        else if (c == ')') 
        {
            while (topStack != -1 && stack[topStack] != '(') 
            {
                appendOutput(popStack());
            }
            if (topStack != -1 && stack[topStack] == '(') 
            {
                popStack(); // discard '('
            } else {
                printf("Error: Mismatched parentheses!\n");
                return;
            }
        }
        else if (isOperator(c)) 
        {
            while (topStack != -1 && isOperator(stack[topStack]) &&
                  ((precedence(c) < precedence(stack[topStack])) ||
                   (precedence(c) == precedence(stack[topStack]) && isLeftAssociative(c)))) 
                   {
                appendOutput(popStack());
            }
            pushStack(c);
        }
        else 
        {
            printf("Error: Invalid character '%c'\n", c);
            return;
        }
    }

    while (topStack != -1) 
    {
        if (stack[topStack] == '(') 
        {
            printf("Error: Mismatched parentheses!\n");
            return;
        }
        appendOutput(popStack());
    }
}

int main()
 {
    printf("Enter an infix expression: ");
    fgets(input, sizeof(input), stdin);
    input[strcspn(input, "\n")] = '\0'; 

    infixToPostfix();

    printf("Postfix Expression: %s\n", output);

    return 0;
}
