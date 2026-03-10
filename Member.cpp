#include "Member.h"
#include <iostream>
#include <algorithm>

Member::Member(int id, std::string name, std::string password)
    : User(id, name, password), fines(0.0) {}

const std::vector<int>& Member::getBorrowedBooks() const { return borrowedBooks; }

void Member::addBorrowedBook(int bookId) { borrowedBooks.push_back(bookId); }

void Member::removeBorrowedBook(int bookId) {
    auto it = std::find(borrowedBooks.begin(), borrowedBooks.end(), bookId);
    if (it != borrowedBooks.end()) borrowedBooks.erase(it);
}

double Member::getFines() const { return fines; }

void Member::addFine(double amount) { fines += amount; }

void Member::payFines(double amount) {
    if (amount > fines) fines = 0;
    else fines -= amount;
}

void Member::displayInfo() const {
    std::cout << "Member - ";
    User::displayInfo();
    std::cout << "Borrowed Books: ";
    for (int id : borrowedBooks) std::cout << id << " ";
    std::cout << ", Fines: $" << fines << std::endl;
}