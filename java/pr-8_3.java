import java.io.*;
class pr8_3 {
public static void main(String[] args) throws IOException{
File f = new File("data.txt");
FileInputStream Fin = new FileInputStream(f);
int read;
while((read = Fin.read()) != -1){
System.out.print((char) read);
}
System.out.println();
Fin.close();
}
}
