#include<stdio.h>
int main()
{

    int arr[3][3][3];
    int i, j, k;

    printf("Enter the elements of the array:\n");//entering the elements of the array.
    for(i = 0; i < 2; i++) 
    {
        for(j = 0; j < 3; j++) {
            for(k=0;k<2;k++)
         {
            scanf("%d", &arr[i][j][k]);//scanning the elements of the array.
        } 
    }
}
 
    printf("The elements of the array are:\n");//printing the elements of the array.
     for(i = 0; i < 2; i++) 
    {
        for(j = 0; j < 3; j++) {
                for(k=0;k<2;k++){
            printf("%d ", arr[i][j][k]);//printing  
        }
            printf("\n");//new line for better readability
    }
    printf("\n");//new line for better readability
    }
return 0;    
}