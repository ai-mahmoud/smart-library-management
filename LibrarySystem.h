#ifndef LIBRARYSYSTEM_H
#define LIBRARYSYSTEM_H

#include "LibraryItem.h"
#include "User.h"
#include "LoanTransaction.h"
#include "Librarian.h"
#include "Member.h"
#include <vector>
#include <string>

class LibrarySystem {
private:
    std::vector<LibraryItem> books;
    std::vector<Member> members;
    std::vector<LoanTransaction> loans;
    Librarian librarian; // assuming one librarian

    // File names
    const std::string BOOKS_FILE = "books.txt";
    const std::string MEMBERS_FILE = "members.txt";
    const std::string LOANS_FILE = "loans.txt";

    // Helper methods
    void loadBooks();
    void loadMembers();
    void loadLoans();
    void saveBooks();
    void saveMembers();
    void saveLoans();

    std::string getCurrentDate(); // simple date
    std::string getDueDate(std::string borrowDate); // 14 days later

    void displayTableHeader();
    void displayBookRow(const LibraryItem& book);

public:
    LibrarySystem();
    ~LibrarySystem();

    // Librarian functions
    bool librarianLogin(std::string password);
    void addBook(std::string title, std::string author);
    void removeBook(int id);
    void addMember(std::string name, std::string password);
    void removeMember(int id);
    void displayCatalog();
    void displayLoans();

    // Member functions
    Member* memberLogin(int id, std::string password);
    bool borrowBook(int memberId, int bookId);
    bool returnBook(int memberId, int bookId);
    void payFines(int memberId, double amount);
    void changePassword(int memberId, std::string newPassword);
    void displayMemberBooks(int memberId);

    // General
    void saveAllData();
};

#endif // LIBRARYSYSTEM_H