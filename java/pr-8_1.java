import java.util.*;
class pr8_1 {
public static void main(String[] args) {
try {
Scanner sc = new Scanner(System.in);
String str = new String();
System.out.print("Enter a string to reverse: ");
str = sc.nextLine();
int len = str.length();
StringBuffer rev = new StringBuffer();
for(int i = str.length()-1; i >= 0; i--){
rev.append(str.charAt(i));
}
rev.append('\0');
System.out.print("Reverse: "+rev);
sc.close();
} catch (Exception e) {
System.out.println(e);
}
}
}
