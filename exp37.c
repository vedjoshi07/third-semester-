#include<stdio.h>
#include<stdlib.h>
#include<string.h>

float squarearea(float side) {
    return side * side;
}

float rectanglearea(float length, float width) {
    return length * width;
}

float circlearea(float radius) {
    return 3.14159 * radius * radius;
}

int main(){
    float side, length, width, radius;

    printf("Enter the side of the square: ");
    scanf("%f", &side);
    printf("Area of the square: %.2f\n", squarearea(side));

    printf("Enter the length and width of the rectangle: ");
    scanf("%f %f", &length, &width);
    printf("Area of the rectangle: %.2f\n", rectanglearea(length, width));

    printf("Enter the radius of the circle: ");
    scanf("%f", &radius);
    printf("Area of the circle: %.2f\n", circlearea(radius));

    return 0;
}