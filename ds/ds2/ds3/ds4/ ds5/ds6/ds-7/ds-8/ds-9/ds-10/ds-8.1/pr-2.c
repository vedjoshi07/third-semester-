#include<stdio.h>
void InsertSort(int arr[], int size){
for(int i = 1; i < size; i++){
int curr = arr[i];
int prev = i - 1;
while(prev >= 0 && arr[prev] > curr){
arr[prev + 1] = arr[prev];
prev--;
    }
             arr[prev + 1] = curr;
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
scanf("%d", &arr[i]);
      }
       printf("Data in array before sort: ");
      for(int i = 0; i < n; i++){
      printf("%d ", arr[i]);
}
InsertSort(arr, n);
printf("\nData in array after sort: ");
for(int i = 0; i < n; i++){
printf("%d ", arr[i]);
      }
 return 0;
}
