#ifndef MEMBER_H
#define MEMBER_H

#include "User.h"
#include <vector>

class Member : public User {
private:
    std::vector<int> borrowedBooks;
    double fines;

public:
    Member(int id = 0, std::string name = "", std::string password = "");
    ~Member() = default;

    const std::vector<int>& getBorrowedBooks() const;
    void addBorrowedBook(int bookId);
    void removeBorrowedBook(int bookId);
    double getFines() const;
    void addFine(double amount);
    void payFines(double amount);

    void displayInfo() const override;
};

#endif // MEMBER_H