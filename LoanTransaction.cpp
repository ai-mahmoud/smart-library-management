#include "LoanTransaction.h"
#include <iostream>

LoanTransaction::LoanTransaction(int bookId, int memberId, std::string borrowDate,
                                 std::string dueDate, std::string returnDate)
    : bookId(bookId), memberId(memberId), borrowDate(borrowDate),
      dueDate(dueDate), returnDate(returnDate) {}

int LoanTransaction::getBookId() const { return bookId; }

int LoanTransaction::getMemberId() const { return memberId; }

std::string LoanTransaction::getBorrowDate() const { return borrowDate; }

std::string LoanTransaction::getReturnDate() const { return returnDate; }

std::string LoanTransaction::getDueDate() const { return dueDate; }

void LoanTransaction::setReturnDate(std::string date) { returnDate = date; }

bool LoanTransaction::isReturned() const { return !returnDate.empty(); }

void LoanTransaction::displayInfo() const {
    std::cout << "Book ID: " << bookId << ", Member ID: " << memberId
              << ", Borrow: " << borrowDate << ", Due: " << dueDate
              << ", Returned: " << (isReturned() ? returnDate : "Not yet") << std::endl;
}