import java.io.*;
class pr8_2 {
public static void main(String[] args) throws IOException{
File f1 = new File("array.txt");
FileInputStream Fin = new FileInputStream(f1);
File f2 = new File("reverse.txt");
if(!f2.exists()){
f2.createNewFile();
}
FileOutputStream Fout = new FileOutputStream(f2);
int[] a = new int[(int)(f1.length())];
int i = 0, data;
while((data = Fin.read()) != -1){
a[i++] = data;
}
for(int j = a.length - 1; j >= 0; j--){
Fout.write(a[j]);
}
Fout.close();
Fin.close();
}
}