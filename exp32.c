#include<stdio.h>
void indian();
void french();
int main()
{
    int i,f;
    printf("if you are indian enter 'i' and if you are french enter 'f'. : ");
    char ch;
    scanf(" %c", &ch); 


    if (ch == 'i'){
        indian();
    }
    else{
        french();
    }

  return 0;
}

void indian(){
    printf("namste\n");
  
}

void french(){
    printf("bonjour");
}