#include<stdio.h> 
#include<stdlib.h> 
#define size 5
int queue[size], front = -1, rear = -1; 
 
int isFull(){ 
    return front == rear+1 || rear == size-1; 
} 
 
int isEmpty(){ 
    return front == -1 && rear == -1; 
} 
 
void enqueue(int val){ 
    if(isFull()){ 
        printf("Queue is Full. \n"); 
        return; 
    } 
 
    if(front == -1){ 
        front++; 
    } 
 
    rear = (rear+1) % size; 
    queue[rear] = val; 
} 
 
int dequeue(){ 
    int temp; 
    if(isEmpty()){ 
        printf("Queue is Empty. \n"); 
        exit(0); 
    } else if(front == rear){ 
        temp = queue[front]; 
        front = rear = -1; 
        return temp; 
    } else { 
        temp = queue[front]; 
        front = (front + 1) % size; 
        return temp; 
    } 
} 
void display(){ 
    if(isEmpty()){ 
        printf("Queue is Empty. \n"); 
        return; 
    } 
 
    for(int i = front; i <= rear; i = (i + 1) % size){ 
        printf("%d ", queue[i]); 
    } 
} 
 
int main(){ 
    int value, choice; 
 
    while(1){ 
        printf("Select one of the option from below from 1 to 6:\n"); 
        printf("1. Add\n2. Remove\n3. display()\n4. isEmpty()\n5. isFull()\n6. exit()\n"); 
        scanf("%d", &choice); 
        switch(choice){ 
            case 1: 
                    printf("Enter value to push: "); 
                    scanf("%d", &value); 
                    enqueue(value); 
                    break; 
 
            case 2: 
                    printf("Element is removed = %d\n", dequeue()); 
                    break; 
 
            case 3: 
                    printf("Stored values in Queue: "); 
                    display(); 
                    printf("\n"); 
                    break; 
 
            case 4: 
                    if(isEmpty()){ 
                    printf("The Queue is empty.\n"); 
                    } else { 
                    printf("The Queue is not empty.\n"); 
                    } 
                    break; 
 
            case 5: 
                    if(isFull()){ 
                    printf("The Queue is full.\n"); 
                    } else { 
                    printf("The Queue is not full.\n"); 
                    } 
                    break; 
            case 6: 
                    exit(0); 
                    break; 
            default: 
                    printf("Select valid option!\n"); 
        } 
    } 
 
    return 0; 
}