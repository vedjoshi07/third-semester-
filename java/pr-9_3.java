import java.awt.*;
import java.awt.event.*;
class pr9_3 implements ItemListener{
Choice c;
Label l1, l2;
pr9_3(){
Frame f = new Frame("Choice Menu Demo");
l1 = new Label("Selected IIT: ");
l2 = new Label();
c = new Choice();
c.add("IIT");
c.add("Indore");
c.add("Mumbai");
c.add("Delhi");
c.setBounds(30, 50, 100, 50);
c.addItemListener(this);
l1.setBounds(30, 120, 100, 30);
l2.setBounds(140, 120, 100, 30);
f.setLayout(null);
f.setSize(400,400);
f.addWindowListener(new WindowAdapter() {
public void windowClosing(WindowEvent e){
f.dispose();
}
});
f.add(c);
f.add(l1);
f.add(l2);
f.setVisible(true);
}
public void itemStateChanged(ItemEvent ie){
l2.setText(c.getSelectedItem());
}
public static void main(String[] args) {
pr9_3 obj = new pr9_3();
}
}
