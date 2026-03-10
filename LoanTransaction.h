#ifndef LOANTRANSACTION_H
#define LOANTRANSACTION_H

#include <string>

class LoanTransaction {
private:
    int bookId;
    int memberId;
    std::string borrowDate;
    std::string returnDate; // empty if not returned
    std::string dueDate;

public:
    LoanTransaction(int bookId = 0, int memberId = 0, std::string borrowDate = "",
                    std::string dueDate = "", std::string returnDate = "");
    ~LoanTransaction() = default;

    int getBookId() const;
    int getMemberId() const;
    std::string getBorrowDate() const;
    std::string getReturnDate() const;
    std::string getDueDate() const;
    void setReturnDate(std::string date);

    bool isReturned() const;
    void displayInfo() const;
};

#endif // LOANTRANSACTION_H