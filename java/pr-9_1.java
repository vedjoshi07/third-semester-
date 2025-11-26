import java.awt.*;
import java.awt.event.*;
class pr9_1 extends Frame {
pr9_1() {
setTitle("Smileface");
setSize(400, 300);
setBackground(Color.cyan);
setVisible(true);
addWindowListener(new WindowAdapter() {
    public void windowClosing(WindowEvent e) {
    dispose();
    }
    });
    }
    public void paint(Graphics g) {
    g.setColor(Color.PINK);
    g.fillOval(80, 80, 100, 100);
    g.setColor(Color.BLACK);
    g.fillOval(105, 110, 10, 10);
    g.fillOval(145, 110, 10, 10);
    g.drawArc(105, 130, 50, 30, 180, 180);
    }
    public static void main(String[] args) {
    new pr9_1();
    }
}