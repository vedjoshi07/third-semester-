import java.awt.event.*;
import javax.swing.*;
class pr9_4 extends JFrame implements ActionListener{
JLabel l1, l2, l3;
JButton b;
JTextField tf1;
JPasswordField tpass;
pr9_4(){
l1 = new JLabel("Enter Your Name:");
l2 = new JLabel("Enter Your Password:");
l3 = new JLabel("");
b = new JButton("Login");
tf1 = new JTextField();
tpass = new JPasswordField();
l1.setBounds(30, 60, 140, 28);
l2.setBounds(30, 110, 140, 28);
l3.setBounds(50, 200, 300, 30);
tf1.setBounds(180, 60, 240, 28);
tpass.setBounds(180, 110, 240, 28);
b.setBounds(180, 160, 100, 32);
add(l1);
add(l2);
add(l3);
add(tf1);
add(tpass);
add(b);
b.addActionListener(this);
setLayout(null);
setSize(500,400);
setVisible(true);
setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
}
public void actionPerformed(ActionEvent e) {
String name = tf1.getText();
String pass = new String(tpass.getPassword()); // get password safely
// Check username and password
if (name.equals("vraj") && pass.equals("1234")) {
l3.setText("Login Successful! Welcome " + name);
} else {
JOptionPane.showMessageDialog(this,
"Invalid username or password!",
"Error", JOptionPane.ERROR_MESSAGE);
}
}
public static void main(String[] args) {
new pr9_4();
}
}