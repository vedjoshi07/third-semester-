#include <stdio.h>
#define TABLE_SIZE 10
int hash(int key) {
return key % TABLE_SIZE; }
void insert(int hashTable[], int key) {
int index = hash(key);
int originalIndex = index;
while (hashTable[index] != -1) {
index = (index + 1) % TABLE_SIZE;
if (index == originalIndex) {
printf("Hash table is full! Cannot insert key %d\n", key);
return; } }
hashTable[index] = key; }
int search(int hashTable[], int key) {
int index = hash(key);
int originalIndex = index;
while (hashTable[index] != -1) {
if (hashTable[index] == key)
return index;
index = (index + 1) % TABLE_SIZE;
if (index == originalIndex)
break; }
return -1; }
void display(int hashTable[]) {
printf("Hash Table:\n");
for (int i = 0; i < TABLE_SIZE; i++) {
if (hashTable[i] != -1)
printf("Index %d: %d\n", i, hashTable[i]);
else
printf("Index %d: Empty\n", i); } }
int main() {
int hashTable[TABLE_SIZE];
for (int i = 0; i < TABLE_SIZE; i++) {
hashTable[i] = -1; }
int n, key, choice, result;
printf("Enter number of elements to insert: ");
scanf("%d", &n);
printf("Enter %d elements:\n", n);
for (int i = 0; i < n; i++) {
scanf("%d", &key);
insert(hashTable, key); }
display(hashTable);
while (1) {
printf("\n1. Search\n2. Display\n3. Exit\nEnter choice: ");
scanf("%d", &choice);
switch (choice) {
case 1:
printf("Enter key to search: ");
scanf("%d", &key);
result = search(hashTable, key);
if (result == -1)
printf("Key %d not found in the hash table.\n", key);
else
printf("Key %d found at index %d.\n", key, result);
break;
case 2:
display(hashTable);
break;
case 3:
return 0;
default:
printf("Invalid choice. Try again.\n"); } }
return 0;}