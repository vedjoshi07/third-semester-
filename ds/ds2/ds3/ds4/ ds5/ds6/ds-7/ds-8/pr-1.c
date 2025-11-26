#include <stdio.h>
#include <stdlib.h>
#include <math.h>
void printArray(int arr[], int n) {
for (int i = 0; i < n; i++)
printf("%d ", arr[i]);
printf("\n"); }
void bubbleSort(int arr[], int n) {
for (int i = 0; i < n - 1; i++)
for (int j = 0; j < n - i - 1; j++)
if (arr[j] > arr[j + 1]) {
int temp = arr[j];
arr[j] = arr[j + 1];
arr[j + 1] = temp; }}
void insertionSort(int arr[], int n) {
for (int i = 1; i < n; i++) {
int key = arr[i];
int j = i - 1;
while (j >= 0 && arr[j] > key) {
arr[j + 1] = arr[j];
j--;
}
arr[j + 1] = key; }}
void selectionSort(int arr[], int n) {
for (int i = 0; i < n - 1; i++) {
int min_idx = i;
for (int j = i + 1; j < n; j++)
if (arr[j] < arr[min_idx])
min_idx = j;
int temp = arr[min_idx];
arr[min_idx] = arr[i];
arr[i] = temp; }}
int partition(int arr[], int low, int high) {
int pivot = arr[high];
int i = low - 1;
for (int j = low; j < high; j++) {
if (arr[j] < pivot) {
i++;
int temp = arr[i];
arr[i] = arr[j];
arr[j] = temp; } }
int temp = arr[i + 1];
arr[i + 1] = arr[high];
arr[high] = temp;
return (i + 1); }
void quickSort(int arr[], int low, int high) {
if (low < high) {
int pi = partition(arr, low, high);
quickSort(arr, low, pi - 1);
quickSort(arr, pi + 1, high); }}
void merge(int arr[], int l, int m, int r) {
int n1 = m - l + 1;
int n2 = r - m;
int L[n1], R[n2];
for (int i = 0; i < n1; i++) L[i] = arr[l + i];
for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
int i = 0, j = 0, k = l;
while (i < n1 && j < n2)
arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
while (i < n1) arr[k++] = L[i++];
while (j < n2) arr[k++] = R[j++];}
void mergeSort(int arr[], int l, int r) {
if (l < r) {
int m = l + (r - l) / 2;
mergeSort(arr, l, m);
mergeSort(arr, m + 1, r);
merge(arr, l, m, r); }}
void shellSort(int arr[], int n) {
for (int gap = n / 2; gap > 0; gap /= 2)
for (int i = gap; i < n; i++) {
int temp = arr[i];
int j;
for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
arr[j] = arr[j - gap];
arr[j] = temp; }
}
void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, n, largest); }}
    void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
    for (int i = n - 1; i >= 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0); }}
    void countingSort(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++)
    if (arr[i] > max)
    max = arr[i];
    int *count = (int *)calloc(max + 1, sizeof(int));
    int *output = (int *)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++)
    count[arr[i]]++;
    for (int i = 1; i <= max; i++)
    count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--)
    output[--count[arr[i]]] = arr[i];
    for (int i = 0; i < n; i++)
    arr[i] = output[i];
    free(count);
    free(output);}
    int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++)
    if (arr[i] > mx)
    mx = arr[i];
    return mx; }
    void countingSortByDigit(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};
    for (int i = 0; i < n; i++)
    count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++)
count[i] += count[i - 1];
for (int i = n - 1; i >= 0; i--) {
output[count[(arr[i] / exp) % 10] - 1] = arr[i];
count[(arr[i] / exp) % 10]--; }
for (int i = 0; i < n; i++)
arr[i] = output[i];}
void radixSort(int arr[], int n) {
int m = getMax(arr, n);
for (int exp = 1; m / exp > 0; exp *= 10)
countingSortByDigit(arr, n, exp); }
int main() {
int arr[] = {64, 34, 25, 12, 22, 11, 90};
int n = sizeof(arr) / sizeof(arr[0]);
printf("Original array:\n");
printArray(arr, n);
printf("\nSorted array:\n");
printArray(arr, n);
return 0; }