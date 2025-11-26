#include<stdio.h>
#include<stdlib.h>
#define SIZE 5
int rear = -1, queue[SIZE], front = -1,i;

int isEmpty(){
    return rear == -1;
}

int isFull(){
    return rear + 1 == SIZE;
}

void enqueue(int val){
    if(isFull()){
	printf("The Queue is Full\n");
    }

    if(front == -1){
	front++;
    }
    queue[++rear] = val;
}

int dequeue(){
    if(isEmpty()){
	printf("The Queue is Empty\n");
    }

    return queue[front++];
}

void display(){
    if(isEmpty()){
	printf("The Queue is Empty");
	return;
    }

    for(i = front; i <= rear; i++){
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
