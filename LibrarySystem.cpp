#include "LibrarySystem.h"
#include <iostream>
#include <fstream>
#include <iomanip>
#include <ctime>
#include <algorithm>

LibrarySystem::LibrarySystem() : librarian(1, "Admin", "admin") {
    loadBooks();
    loadMembers();
    loadLoans();
}

LibrarySystem::~LibrarySystem() {
    saveAllData();
}

void LibrarySystem::loadBooks() {
    std::ifstream file(BOOKS_FILE);
    if (!file) return;
    int id; std::string title, author; bool avail;
    while (file >> id >> std::ws && std::getline(file, title, '|') &&
           std::getline(file, author, '|') && file >> avail) {
        books.emplace_back(id, title, author, avail);
    }
    file.close();
}

void LibrarySystem::loadMembers() {
    std::ifstream file(MEMBERS_FILE);
    if (!file) return;
    int id; std::string name, password; double fines;
    std::vector<int> borrowed;
    while (file >> id >> std::ws && std::getline(file, name, '|') &&
           std::getline(file, password, '|') && file >> fines) {
        Member m(id, name, password);
        m.payFines(-fines); // set fines
        int bId;
        while (file >> bId && bId != -1) {
            m.addBorrowedBook(bId);
        }
        members.push_back(m);
    }
    file.close();
}

void LibrarySystem::loadLoans() {
    std::ifstream file(LOANS_FILE);
    if (!file) return;
    int bId, mId; std::string borrow, due, ret;
    while (file >> bId >> mId >> borrow >> due >> ret) {
        loans.emplace_back(bId, mId, borrow, due, ret);
    }
    file.close();
}

void LibrarySystem::saveBooks() {
    std::ofstream file(BOOKS_FILE);
    for (const auto& book : books) {
        file << book.getId() << " " << book.getTitle() << "|" << book.getAuthor() << "|" << book.isAvailable() << "\n";
    }
    file.close();
}

void LibrarySystem::saveMembers() {
    std::ofstream file(MEMBERS_FILE);
    for (const auto& member : members) {
        file << member.getId() << " " << member.getName() << "|" << member.getPassword() << "|" << member.getFines();
        for (int b : member.getBorrowedBooks()) file << " " << b;
        file << " -1\n";
    }
    file.close();
}

void LibrarySystem::saveLoans() {
    std::ofstream file(LOANS_FILE);
    for (const auto& loan : loans) {
        file << loan.getBookId() << " " << loan.getMemberId() << " " << loan.getBorrowDate() << " "
             << loan.getDueDate() << " " << loan.getReturnDate() << "\n";
    }
    file.close();
}

std::string LibrarySystem::getCurrentDate() {
    time_t now = time(0);
    tm* ltm = localtime(&now);
    char buffer[11];
    sprintf(buffer, "%04d-%02d-%02d", 1900 + ltm->tm_year, 1 + ltm->tm_mon, ltm->tm_mday);
    return std::string(buffer);
}

std::string LibrarySystem::getDueDate(std::string borrowDate) {
    // Simple: add 14 days
    return borrowDate + " +14d"; // placeholder
}

void LibrarySystem::displayTableHeader() {
    std::cout << std::left << std::setw(5) << "ID" << std::setw(30) << "Title"
              << std::setw(20) << "Author" << std::setw(10) << "Available" << "\n";
    std::cout << std::string(65, '-') << "\n";
}

void LibrarySystem::displayBookRow(const LibraryItem& book) {
    std::cout << std::left << std::setw(5) << book.getId() << std::setw(30) << book.getTitle()
              << std::setw(20) << book.getAuthor() << std::setw(10) << (book.isAvailable() ? "Yes" : "No") << "\n";
}

bool LibrarySystem::librarianLogin(std::string password) {
    return librarian.getPassword() == password;
}

void LibrarySystem::addBook(std::string title, std::string author) {
    int id = books.empty() ? 1 : books.back().getId() + 1;
    books.emplace_back(id, title, author, true);
    saveBooks();
    std::cout << "Book added successfully!\n";
}

void LibrarySystem::removeBook(int id) {
    auto it = std::find_if(books.begin(), books.end(), [id](const LibraryItem& b){ return b.getId() == id; });
    if (it != books.end()) {
        books.erase(it);
        saveBooks();
        std::cout << "Book removed successfully!\n";
    } else {
        std::cout << "Book not found!\n";
    }
}

void LibrarySystem::addMember(std::string name, std::string password) {
    int id = members.empty() ? 1 : members.back().getId() + 1;
    members.emplace_back(id, name, password);
    saveMembers();
    std::cout << "Member added successfully! ID: " << id << "\n";
}

void LibrarySystem::removeMember(int id) {
    auto it = std::find_if(members.begin(), members.end(), [id](const Member& m){ return m.getId() == id; });
    if (it != members.end()) {
        members.erase(it);
        saveMembers();
        std::cout << "Member removed successfully!\n";
    } else {
        std::cout << "Member not found!\n";
    }
}

void LibrarySystem::displayCatalog() {
    displayTableHeader();
    for (const auto& book : books) {
        displayBookRow(book);
    }
}

void LibrarySystem::displayLoans() {
    std::cout << "Loan Transactions:\n";
    for (const auto& loan : loans) {
        loan.displayInfo();
    }
}

Member* LibrarySystem::memberLogin(int id, std::string password) {
    for (auto& member : members) {
        if (member.getId() == id && member.getPassword() == password) {
            return &member;
        }
    }
    return nullptr;
}

bool LibrarySystem::borrowBook(int memberId, int bookId) {
    auto bookIt = std::find_if(books.begin(), books.end(), [bookId](const LibraryItem& b){ return b.getId() == bookId; });
    auto memberIt = std::find_if(members.begin(), members.end(), [memberId](const Member& m){ return m.getId() == memberId; });

    if (bookIt == books.end() || !bookIt->isAvailable()) {
        std::cout << "Book not available!\n";
        return false;
    }
    if (memberIt == members.end()) {
        std::cout << "Member not found!\n";
        return false;
    }

    bookIt->setAvailable(false);
    memberIt->addBorrowedBook(bookId);
    std::string date = getCurrentDate();
    loans.emplace_back(bookId, memberId, date, getDueDate(date), "");
    saveAllData();
    std::cout << "Book borrowed successfully!\n";
    return true;
}

bool LibrarySystem::returnBook(int memberId, int bookId) {
    auto memberIt = std::find_if(members.begin(), members.end(), [memberId](const Member& m){ return m.getId() == memberId; });
    if (memberIt == members.end()) return false;

    memberIt->removeBorrowedBook(bookId);
    auto bookIt = std::find_if(books.begin(), books.end(), [bookId](LibraryItem& b){ return b.getId() == bookId; });
    if (bookIt != books.end()) bookIt->setAvailable(true);

    auto loanIt = std::find_if(loans.begin(), loans.end(),
        [bookId, memberId](const LoanTransaction& l){ return l.getBookId() == bookId && l.getMemberId() == memberId && !l.isReturned(); });
    if (loanIt != loans.end()) {
        loanIt->setReturnDate(getCurrentDate());
    }
    saveAllData();
    std::cout << "Book returned successfully!\n";
    return true;
}

void LibrarySystem::payFines(int memberId, double amount) {
    auto it = std::find_if(members.begin(), members.end(), [memberId](Member& m){ return m.getId() == memberId; });
    if (it != members.end()) {
        it->payFines(amount);
        saveMembers();
        std::cout << "Fines paid!\n";
    }
}

void LibrarySystem::changePassword(int memberId, std::string newPassword) {
    auto it = std::find_if(members.begin(), members.end(), [memberId](Member& m){ return m.getId() == memberId; });
    if (it != members.end()) {
        it->setPassword(newPassword);
        saveMembers();
        std::cout << "Password changed!\n";
    }
}

void LibrarySystem::displayMemberBooks(int memberId) {
    auto it = std::find_if(members.begin(), members.end(), [memberId](const Member& m){ return m.getId() == memberId; });
    if (it != members.end()) {
        std::cout << "Borrowed Books:\n";
        for (int bId : it->getBorrowedBooks()) {
            auto bookIt = std::find_if(books.begin(), books.end(), [bId](const LibraryItem& b){ return b.getId() == bId; });
            if (bookIt != books.end()) {
                displayBookRow(*bookIt);
            }
        }
    }
}

void LibrarySystem::saveAllData() {
    saveBooks();
    saveMembers();
    saveLoans();
}