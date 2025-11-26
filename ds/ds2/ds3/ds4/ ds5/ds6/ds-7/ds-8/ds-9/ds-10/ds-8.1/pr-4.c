#include <stdio.h>
void swap(int *a, int *b) {
int temp = *a;
*a = *b;
*b = temp;
}
        int partition(int arr[], int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
                     for (int j = low; j < high; j++) {
                     if (arr[j] < pivot) {
                     i++;
                    swap(&arr[i], &arr[j]);
            }
   }
             swap(&arr[i+1], &arr[high]);
             return (i + 1);
   }
         void quickSort(int arr[], int low, int high) {
          if (low < high) {
          int p = partition(arr, low, high);
          quickSort(arr, low, p - 1);
          quickSort(arr, p + 1, high);
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
quickSort(arr, 0, n - 1);
printf("\nData in array after sort: ");
for(int i = 0; i < n; i++){
printf("%d ", arr[i]);
      }
return 0;
 }
