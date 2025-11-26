//reletional operator ==,>,>=,<=,!=
//here -->1 is true
//and -->0 is false
//logical operator &&, ||, !(used to check two conditions)

//operator precedence:- !,*,/,%,+,-,<,<=,>,>=,==,!=,&&,||,=

#include <stdio.h>
int main(){

    printf("%d\n",4 > 2);
    printf("%d\n",(5>2) && (3<4));
    printf("%d\n",!((5<2) || (3<4)));
    printf("%d\n",(5<2) && (3>4));

    int a = 10, b = 20, c = 30;
    printf("%d\n",(a*b+c) && (a+b-c));
    return 0;
}