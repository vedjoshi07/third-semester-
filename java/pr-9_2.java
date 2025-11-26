import java.awt.*;
import java.awt.event.*;

class pr9_2 implements ActionListener
{
            Frame f;
            Button b1, b2, b3;
pr9_2()
{
            f = new Frame("Program 2 of 9th Practical");
            b1 = new Button("Green");
            b2 = new Button("Black");
            b3 = new Button("Red");
            b1.setBounds(20,30,50,50);
            b2.setBounds(40,30,50,50);
            b3.setBounds(60,30,50,50);
            b1.addActionListener(this);
            b2.addActionListener(this);
            b3.addActionListener(this);
            f.add(b1);
            f.add(b2);
            f.add(b3);
            f.setLayout(new FlowLayout());
            f.setSize(400, 300);
            f.setBackground(Color.CYAN);
            f.addWindowListener(new WindowAdapter() 
            {
            public void windowClosing(WindowEvent e)
            {
            f.dispose();
     }
     });
            f.setVisible(true);
        }
public void actionPerformed(ActionEvent e){
                        if(e.getSource() == b1){
                        f.setBackground(Color.GREEN);
                                            }  
                        else if(e.getSource() == b2){
                        f.setBackground(Color.BLACK);
} else 
{
f.setBackground(Color.RED);
}
}
public static void main(String[] args) {
pr9_2 ob = new pr9_2();
}
}