#include<stdio.h> 
#include<stdlib.h> 
#define size 5 
int dq[size], rear = -1, front = -1, i;

int isEmpty(){ 
    return front == -1 && rear == -1; 
} 
 
int isFull(){ 
    return front == rear + 1 || (front == 0 && rear == size-1); 
} 
 
void InsertionAtRear(int val){ 
    if(isFull()){ 
        printf("DE Queue is Full.\n"); 
        return; 
    } else if(front == -1 && rear == -1){ 
        front++; 
        dq[++rear] = val; 
    } else if(rear == size - 1){ 
        rear = 0; 
        dq[rear] = val; 
    } else { 
        dq[++rear] = val; 
    } 
} 
 
int DeletionAtRear(){ 
    int temp; 
    if(isEmpty()){ 
        printf("DE Queue is Empty. \n"); 
    exit(0);
    } else if(front == rear){
    temp = dq[rear];
    front = rear = -1;
    return temp;
    } else if(rear == 0){
    temp = dq[rear];
    rear = size-1;
    return temp;
    } else {
    return dq[rear--];
    }
    return 0;
}

void InsertionAtFront(int val){
    if(isFull()){
    printf("DE Queue is Full.\n");
    return;
    } else if(front == -1 && rear == -1){
    rear++;
    dq[++front] = val;
    } else if(front == 0){
    front = size - 1;
    dq[front] = val;
    } else {

    dq[--front] = val;
    }
}

int DeletionAtFront(){
    int temp;
    if(isEmpty()){
    printf("DE Queue is Empty. \n");
    exit(0);
    } else if(front == rear){
    temp = dq[front];
    front = rear = -1;
    return temp;
    } else if(front == size - 1){
    temp = dq[front];
    front = 0;
    return temp;
    } else {
    return dq[front++];
    }
    return 0;
}
void display(){
    for(i = front; i != (rear+1) % size; i = (i + 1) % size){
    printf("%d ", dq[i]);
    }
}

int main(){
    int value, choice,f=1;
    while(f){
    printf("Select one of the option from below from 1 to 6:\n");
    printf("1. Add From Front\n2. Remove From Front\n3. Add From Rear\n4. Remove From Rear\n5. display()\n6. isEmpty()\n7. isFull()\n8. exit()\n");
    scanf("%d", &choice);

    switch(choice){
        case 1:
            printf("Enter value to push: ");
            scanf("%d", &value);
            InsertionAtFront(value);
            break;

        case 2:
            printf("Element is removed = %d\n", DeletionAtFront());
                    break; 
            case 3: 
                    printf("Enter value to push: "); 
                    scanf("%d", &value); 
                    InsertionAtRear(value); 
                    break; 
 
            case 4: 
                    printf("Element is removed = %d\n", DeletionAtRear()); 
                    break; 
            case 5: 
                    printf("Stored values in Queue: "); 
                    display(); 
                    printf("\n"); 
                    break; 
 
            case 6: 
                    if(isEmpty()){ 
                    printf("The Queue is empty.\n"); 
                    } else { 
                    printf("The Queue is not empty.\n"); 
                    } 
                    break; 
 
            case 7: 
                    if(isFull()){ 
                    printf("The Queue is full.\n"); 
                    } else { 
                    printf("The Queue is not full.\n"); 
                    } 
                    break; 
            case 8: 
                    exit(0); 
                    break; 
            default: 
                    printf("Select valid option!\n"); 
        } 
    } 
    return 0; 
}
