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
    if (head == NULL) {
        head = newNode;
        head->next = head;
    } else {
        struct Node* temp = head;
        while (temp->next != head) {
            temp = temp->next;
        }
        newNode->next = head;
        temp->next = newNode;
        head = newNode;
    }
    printf("Inserted %d at the beginning.\n", data);
}

void InsertAtLast(int data) {
    struct Node* newNode = createNode(data);
    if (head == NULL) {
        head = newNode;
        head->next = head;
    } else {
        struct Node* temp = head;
        while (temp->next != head) {
            temp = temp->next;
        }
        temp->next = newNode;
        newNode->next = head;
    }
    printf("Inserted %d at the end.\n", data);
}

void InsertAfterSpecifiedNode(int key, int data) {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }
    struct Node* temp = head;
    do {
        if (temp->data == key) {
            struct Node* newNode = createNode(data);
            newNode->next = temp->next;
            temp->next = newNode;
            printf("Inserted %d after %d.\n", data, key);
            return;
        }
        temp = temp->next;
    } while (temp != head);
    printf("Node with data %d not found.\n", key);
}

void DeleteAtFirst() {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }
    struct Node* temp = head;
    if (head->next == head) {
        printf("Deleted %d from beginning.\n", head->data);
        free(head);
        head = NULL;
        return;
    }
    struct Node* last = head;
    while (last->next != head) {
        last = last->next;
    }
    head = head->next;
    last->next = head;
    printf("Deleted %d from beginning.\n", temp->data);
    free(temp);
}

void DeleteAtLast() {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }
    if (head->next == head) {
        printf("Deleted %d from end.\n", head->data);
        free(head);
        head = NULL;
        return;
    }
    struct Node* temp = head;
    struct Node* prev = NULL;
    while (temp->next != head) {
        prev = temp;
        temp = temp->next;
    }
    prev->next = head;
    printf("Deleted %d from end.\n", temp->data);
    free(temp);
}

void DeleteAfterSpecifiedNode(int key) {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }
    struct Node* temp = head;
    do {
        if (temp->data == key) {
            struct Node* del = temp->next;
            if (del == head) { 
                printf("Deleted node %d after %d.\n", del->data, key);
                DeleteAtFirst();
                return;
            }
            temp->next = del->next;
            printf("Deleted node %d after %d.\n", del->data, key);
            free(del);
            return;
        }
        temp = temp->next;
    } while (temp != head);
    printf("Node with data %d not found.\n", key);
}

void Traverse() {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }
    struct Node* temp = head;
    printf("Circular Linked List: ");
    do {
        printf("%d -> ", temp->data);
        temp = temp->next;
    } while (temp != head);
    printf("(back to head)\n");
}

int main() {
    int choice, data, key;
    while (1) {
        printf("\n--- Circular Linked List Operations ---\n");
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