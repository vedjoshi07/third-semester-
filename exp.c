#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[50];
    float price;
} Product;

void add_product(FILE *db) {
    Product p;
    printf("Enter ID, Name, Price: ");
    scanf("%d %s %f", &p.id, p.name, &p.price);
    fwrite(&p, sizeof(Product), 1, db);
}

void display_products(FILE *db) {
    Product p;
    rewind(db);
    while(fread(&p, sizeof(Product), 1, db) == 1) {
        printf("ID: %d, Name: %s, Price: %.2f\n", p.id, p.name, p.price);
    }
}

int main() {
    FILE *db = fopen("products.dat", "a+");
    if(!db) {
        perror("Cannot open database");
        return 1;
    }
    
    // Example usage
    add_product(db);
    display_products(db);
    
    fclose(db);
    return 0;
}