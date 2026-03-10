#include "LibrarySystem.h"
#include <iostream>
#include <limits>

// ANSI color codes for bonus
#define RESET   "\033[0m"
#define RED     "\033[31m"
#define GREEN   "\033[32m"
#define YELLOW  "\033[33m"
#define BLUE    "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN    "\033[36m"

void clearScreen() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void displayMainMenu() {
    std::cout << CYAN << "=====================================\n";
    std::cout << "  Smart Library Management System\n";
    std::cout << "  Horus University - Faculty of AI\n";
    std::cout << "=====================================\n" << RESET;
    std::cout << "1. Librarian Login\n";
    std::cout << "2. Member Login\n";
    std::cout << "3. Exit\n";
    std::cout << "Choose an option: ";
}

void displayLibrarianMenu() {
    std::cout << BLUE << "\n--- Librarian Menu ---\n" << RESET;
    std::cout << "1. Add Book\n";
    std::cout << "2. Remove Book\n";
    std::cout << "3. Add Member\n";
    std::cout << "4. Remove Member\n";
    std::cout << "5. Display Catalog\n";
    std::cout << "6. View Loan Transactions\n";
    std::cout << "7. Logout\n";
    std::cout << "Choose an option: ";
}

void displayMemberMenu() {
    std::cout << GREEN << "\n--- Member Menu ---\n" << RESET;
    std::cout << "1. Borrow Book\n";
    std::cout << "2. Return Book\n";
    std::cout << "3. Pay Fines\n";
    std::cout << "4. View Borrowed Books\n";
    std::cout << "5. View Catalog\n";
    std::cout << "6. Change Password\n";
    std::cout << "7. Logout\n";
    std::cout << "Choose an option: ";
}

int getIntInput() {
    int input;
    while (!(std::cin >> input)) {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        std::cout << RED << "Invalid input. Please enter a number: " << RESET;
    }
    return input;
}

std::string getStringInput() {
    std::string input;
    std::cin.ignore();
    std::getline(std::cin, input);
    return input;
}

void handleLibrarianMode(LibrarySystem& system) {
    std::string password;
    std::cout << "Enter librarian password: ";
    std::cin >> password;

    if (!system.librarianLogin(password)) {
        std::cout << RED << "Invalid password!\n" << RESET;
        return;
    }

    std::cout << GREEN << "Login successful!\n" << RESET;

    while (true) {
        displayLibrarianMenu();
        int choice = getIntInput();

        switch (choice) {
            case 1: {
                std::cout << "Enter book title: ";
                std::string title = getStringInput();
                std::cout << "Enter author: ";
                std::string author = getStringInput();
                system.addBook(title, author);
                break;
            }
            case 2: {
                std::cout << "Enter book ID to remove: ";
                int id = getIntInput();
                system.removeBook(id);
                break;
            }
            case 3: {
                std::cout << "Enter member name: ";
                std::string name = getStringInput();
                std::cout << "Enter password: ";
                std::string pass = getStringInput();
                system.addMember(name, pass);
                break;
            }
            case 4: {
                std::cout << "Enter member ID to remove: ";
                int id = getIntInput();
                system.removeMember(id);
                break;
            }
            case 5:
                system.displayCatalog();
                break;
            case 6:
                system.displayLoans();
                break;
            case 7:
                std::cout << "Logging out...\n";
                return;
            default:
                std::cout << RED << "Invalid option!\n" << RESET;
        }
    }
}

void handleMemberMode(LibrarySystem& system) {
    int attempts = 0;
    Member* member = nullptr;

    while (attempts < 3) {
        std::cout << "Enter member ID: ";
        int id = getIntInput();
        std::cout << "Enter password: ";
        std::string password = getStringInput();

        member = system.memberLogin(id, password);
        if (member) break;

        attempts++;
        std::cout << RED << "Invalid credentials. Attempts left: " << (3 - attempts) << "\n" << RESET;
    }

    if (!member) {
        std::cout << RED << "Too many failed attempts. System terminating.\n" << RESET;
        exit(0);
    }

    std::cout << GREEN << "Login successful! Welcome, " << member->getName() << "\n" << RESET;

    while (true) {
        displayMemberMenu();
        int choice = getIntInput();

        switch (choice) {
            case 1: {
                std::cout << "Enter book ID to borrow: ";
                int bookId = getIntInput();
                system.borrowBook(member->getId(), bookId);
                break;
            }
            case 2: {
                std::cout << "Enter book ID to return: ";
                int bookId = getIntInput();
                system.returnBook(member->getId(), bookId);
                break;
            }
            case 3: {
                std::cout << "Enter amount to pay: ";
                double amount = getIntInput(); // assuming int for simplicity
                system.payFines(member->getId(), amount);
                break;
            }
            case 4:
                system.displayMemberBooks(member->getId());
                break;
            case 5:
                system.displayCatalog();
                break;
            case 6: {
                std::cout << "Enter new password: ";
                std::string newPass = getStringInput();
                system.changePassword(member->getId(), newPass);
                break;
            }
            case 7:
                std::cout << "Logging out...\n";
                return;
            default:
                std::cout << RED << "Invalid option!\n" << RESET;
        }
    }
}

int main() {
    LibrarySystem system;

    while (true) {
        displayMainMenu();
        int choice = getIntInput();

        switch (choice) {
            case 1:
                handleLibrarianMode(system);
                break;
            case 2:
                handleMemberMode(system);
                break;
            case 3:
                std::cout << "Exiting system...\n";
                return 0;
            default:
                std::cout << RED << "Invalid option!\n" << RESET;
        }
    }

    return 0;
}