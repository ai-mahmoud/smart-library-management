#include "Librarian.h"
#include <iostream>

Librarian::Librarian(int id, std::string name, std::string password)
    : User(id, name, password) {}

void Librarian::displayInfo() const {
    std::cout << "Librarian - ";
    User::displayInfo();
}