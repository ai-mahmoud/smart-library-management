#ifndef LIBRARIAN_H
#define LIBRARIAN_H

#include "User.h"

class Librarian : public User {
public:
    Librarian(int id = 0, std::string name = "", std::string password = "");
    ~Librarian() = default;

    void displayInfo() const override;
};

#endif // LIBRARIAN_H