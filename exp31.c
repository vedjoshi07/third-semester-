//function prototype:- void printhello();
//function call:-
//    int main ()
//         printhello();
//         return 0;


#include <stdio.h>

void printhello();

int main()
{
   //function call
    printhello();
    printhello();
    printhello();
    printgoodbye();
  return 0;
}

//funtion definition

void printhello(){
    printf ("hello!\n");
}

void printgoodbye()
 {
    printf("goodbye");
}