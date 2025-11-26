#include <stdio.h>
int binarySearch(int arr[], int low, int high, int key) {
while (low <= high) {
int mid = low + (high - low) / 2;
if (arr[mid] == key) {
return mid; }
     else if (arr[mid] < key) {
        low = mid + 1; }
        else {
        high = mid - 1; }
    }
    return -1; 
}

int main() {
         int n, key, result;
         printf("Enter number of elements (sorted): ");
         scanf("%d", &n);
         int arr[n];
         printf("Enter %d sorted elements:\n", n);
                for (int i = 0; i < n; i++) {
                 scanf("%d", &arr[i]); }
 printf("Enter the element to search: "); 
 scanf("%d", &key);
 result = binarySearch(arr, 0, n - 1, key);
 if (result == -1) {
        printf("Element not found in the array.\n");
} else {
       printf("Element found at index %d.\n", result); }
return 0; 
}