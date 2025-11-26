import java.io.*;
class pr8_4 {
public static void main(String[] args) throws IOException{
File f = new File("data1.txt");
FileInputStream Fin = new FileInputStream(f);
File f2 = new File("copy.txt");
if(!f2.exists()){
f2.createNewFile();
}
FileOutputStream Fout = new FileOutputStream(f2);
int read;
while((read = Fin.read()) != -1){
Fout.write((char)read);
}
Fin.close();
Fout.close();
}
}