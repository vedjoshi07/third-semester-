#include<stdio.h>

struct student {
    int age;
    char name[50];
    float marks;
};

struct student1{
    int name[50];
    int class;
    int marks;
};

int main() {
    struct student s1 = {20, "rahul", 18.5}; 
    struct student s2 = {.age = 20, .name = "vikas", .marks = 22};

    printf("Student 1: Name = %s, Age = %d, Marks = %.2f\n", s1.name, s1.age, s1.marks);
    printf("Student 2: Name = %s, Age = %d, Marks = %.2f\n", s2.name, s2.age, s2.marks);

    struct student s3 = {20, "rahul", 18.5};
    struct student s4 = {.age = 20, .name = "vikas", .marks = 22};
    printf("Student 3: Name = %s, Age = %d, Marks = %.2f\n", s3.name, s3.age, s3.marks);
    printf("Student 4: Name = %s, Age = %d, Marks = %.2f\n", s4.name, s4.age, s4.marks);

    return 0;
}