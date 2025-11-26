import java.util.*;

class Account {
    String holderName;
    double balance;
    String password;

    Account(String holderName, String password) {
        this.holderName = holderName;
        this.password = password;
        this.balance = 0.0;
    }
}

public class pr4_1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        HashMap<String, Account> accounts = new HashMap<>();
        Account currentAccount = null;

        System.out.println("=== ADVANCED ATM SYSTEM ===");

        while (true) {
            if (currentAccount == null) {
                System.out.println("\n1. Create New Account");
                System.out.println("2. Login");
                System.out.println("3. Exit");
                System.out.print("Choose option: ");
                int mainChoice = scanner.nextInt();
                scanner.nextLine(); // consume newline

                switch (mainChoice) {
                    case 1:
                        System.out.print("Enter account holder name: ");
                        String name = scanner.nextLine();
                        System.out.print("Set a password: ");
                        String password = scanner.nextLine();

                        if (accounts.containsKey(name)) {
                            System.out.println("Account already exists!");
                        } else {
                            accounts.put(name, new Account(name, password));
                            System.out.println("✅ Account created successfully!");
                        }
                        break;

                    case 2:
                        System.out.print("Enter account holder name: ");
                        String loginName = scanner.nextLine();
                        System.out.print("Enter password: ");
                        String loginPass = scanner.nextLine();

                        if (accounts.containsKey(loginName)) {
                            Account acc = accounts.get(loginName);
                            if (acc.password.equals(loginPass)) {
                                currentAccount = acc;
                                System.out.println("✅ Login successful! Welcome, " + acc.holderName + "!");
                            } else {
                                System.out.println("❌ Wrong password!");
                            }
                        } else {
                            System.out.println("❌ Account not found!");
                        }
                        break;

                    case 3:
                        System.out.println("👋 Goodbye! Thank you for using our ATM.");
                        scanner.close();
                        return;

                    default:
                        System.out.println("Please enter 1, 2 or 3 only.");
                        break;
                }
            } else {
                System.out.println("\n=== ATM Menu (" + currentAccount.holderName + ") ===");
                System.out.println("1. Deposit");
                System.out.println("2. Withdraw");
                System.out.println("3. Check Balance");
                System.out.println("4. Logout");
                System.out.print("Choose option: ");
                int choice = scanner.nextInt();

                switch (choice) {
                    case 1:
                        System.out.print("Enter amount to deposit: $");
                        double deposit = scanner.nextDouble();
                        currentAccount.balance += deposit;
                        System.out.println("✅ Deposit successful! New balance: $" + currentAccount.balance);
                        break;

                    case 2:
                        System.out.print("Enter amount to withdraw: $");
                        double withdraw = scanner.nextDouble();
                        if (withdraw <= currentAccount.balance) {
                            currentAccount.balance -= withdraw;
                            System.out.println("✅ Withdrawal successful! New balance: $" + currentAccount.balance);
                        } else {
                            System.out.println("❌ Insufficient funds!");
                        }
                        break;

                    case 3:
                        System.out.println("💰 Your current balance is: $" + currentAccount.balance);
                        break;

                    case 4:
                        System.out.println("👋 Logged out from " + currentAccount.holderName + "'s account.");
                        currentAccount = null;
                        break;

                    default:
                        System.out.println("Invalid choice! Please try again.");
                }
            }
        }
    }
}
