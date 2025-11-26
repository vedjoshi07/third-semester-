#include<stdio.h>
int main(){
    int arr[3][3],count = 0,i,j;

    printf("Enter the elements of the array:\n");
    for(i = 0; i < 3; i++) 
    {
        for(j = 0; j < 3; j++) {
            scanf("%d", &arr[i][j]);
        }
    }

    printf("The elements of the array are:\n");
    for(i = 0; i < 3; i++) 
    {
        for(j = 0; j < 3; j++) {
            printf("%d ", arr[i][j]);
        }
    }

    printf("\n");
    
    for(i = 0; i < 3; i++) 
    {
        for(j = 0; j < 3; j++) {
            if(arr[i][j] == 0) 
            {
                count++;
            }
        }
    }

    if(count > (3 * 3) / 2)
    {
        printf("The matrix is a sparse matrix.\n");
    } else 
    {
        printf("The matrix is not a sparse matrix.\n");
    }

    return 0;
}
    