#include<stdio.h>
void bubbleSort(int arr[], int size){
for(int i = 0; i < size - 1; i++){
int isSwap = 0;
for(int j = 0; j < size - i - 1; j++){
if(arr[j] > arr[j + 1]){
int temp = arr[j];
arr[j] = arr[j + 1];
arr[j + 1] = temp;
isSwap = 1;
            }
       }
        if(!isSwap){
        return;
         }
    }
}
int main(){
int n;
printf("Enter size for the array: ");
scanf("%d"
, &n);
int arr[n];
printf("Enter data to store: ");
for(int i = 0; i < n; i++){
scanf("%d"
, &arr[i]);
}
printf("Data in array before sort: ");
for(int i = 0; i < n; i++){
printf("%d "
, arr[i]);
}
bubbleSort(arr, n);
printf("\nData in array after sort: ");
for(int i = 0; i < n; i++){
printf("%d "
, arr[i]);
}
return 0;
 }
