#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (!newNode) {
        printf("Memory allocation failed.\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void InsertAtFirst(int data) {
    struct Node* newNode = createNode(data);
    newNode->next = head;
    head = newNode;
    printf("Inserted %d at the beginning.\n", data);
}

void InsertAtLast(int data) {
    struct Node* newNode = createNode(data);
    if (head == NULL) {
        head = newNode;
    } else {
        struct Node* temp = head;
        while (temp->next != NULL)
            temp = temp->next;
        temp->next = newNode;
    }
    printf("Inserted %d at the end.\n", data);
}

void InsertAfterSpecifiedNode(int key, int data) {
    struct Node* temp = head;
    while (temp != NULL && temp->data != key)
        temp = temp->next;

    if (temp == NULL) {
        printf("Node with data %d not found.\n", key);
        return;
    }

    struct Node* newNode = createNode(data);
    newNode->next = temp->next;
    temp->next = newNode;
    printf("Inserted %d after %d.\n", data, key);
}

void DeleteAtFirst() {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }

    struct Node* temp = head;
    head = head->next;
    printf("Deleted %d from beginning.\n", temp->data);
    free(temp);
}

void DeleteAtLast() {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }

    if (head->next == NULL) {
        printf("Deleted %d from end.\n", head->data);
        free(head);
        head = NULL;
        return;
    }

    struct Node* temp = head;
    while (temp->next->next != NULL)
        temp = temp->next;

    printf("Deleted %d from end.\n", temp->next->data);
    free(temp->next);
    temp->next = NULL;
}

void DeleteAfterSpecifiedNode(int key) {
    struct Node* temp = head;
    while (temp != NULL && temp->data != key)
        temp = temp->next;

    if (temp == NULL || temp->next == NULL) {
        printf("No node found after %d.\n", key);
        return;
    }

    struct Node* del = temp->next;
    temp->next = del->next;
    printf("Deleted node %d after %d.\n", del->data, key);
    free(del);
}

void Traverse() {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }

    struct Node* temp = head;
    printf("Linked List: ");
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

int main() {
    int choice, data, key;

    while (1) {
        printf("\n--- Singly Linked List Operations ---\n");
        printf("1. Insert at First\n");
        printf("2. Insert at Last\n");
        printf("3. Insert After Specified Node\n");
        printf("4. Delete at First\n");
        printf("5. Delete at Last\n");
        printf("6. Delete After Specified Node\n");
        printf("7. Display (Traverse)\n");
        printf("8. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter data: ");
                scanf("%d", &data);
                InsertAtFirst(data);
                break;
            case 2:
                printf("Enter data: ");
                scanf("%d", &data);
                InsertAtLast(data);
                break;
            case 3:
                printf("Enter key (node value after which to insert): ");
                scanf("%d", &key);
                printf("Enter data: ");
                scanf("%d", &data);
                InsertAfterSpecifiedNode(key, data);
                break;
            case 4:
                DeleteAtFirst();
                break;
            case 5:
                DeleteAtLast();
                break;
            case 6:
                printf("Enter key (node value after which to delete): ");
                scanf("%d", &key);
                DeleteAfterSpecifiedNode(key);
                break;
            case 7:
                Traverse();
                break;
            case 8:
                printf("Exiting program...\n");
                exit(0);
            default:
                printf("Invalid choice! Try again.\n");
        }
    }

    return 0;
}