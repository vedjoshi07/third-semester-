#include<stdio.h>
          void selectionSort(int arr[], int size){
          for(int i = 0; i < size - 1; i++){
          int smallestIdx = i;
          for(int j = i + 1; j < size; j++){
          if(arr[j] < arr[smallestIdx]){
       smallestIdx = j;
      }
  }
       int temp = arr[i];
       arr[i] = arr[smallestIdx];
       arr[smallestIdx] = temp;
      }
  }
int main(){
int n;
printf("Enter size for the array: ");
scanf("%d", &n);
int arr[n];
printf("Enter data to store: ");
for(int i = 0; i < n; i++){
scanf("%d", &arr[i]);
}
printf("Data in array before sort: ");
for(int i = 0; i < n; i++){
printf("%d ", arr[i]);
  }
      selectionSort(arr, n);
      printf("\nData in array after sort: ");
      for(int i = 0; i < n; i++){
      printf("%d ", arr[i]);
   }
     return 0;
  }
