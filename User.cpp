#include "User.h"
#include <iostream>

User::User(int id, std::string name, std::string password)
    : id(id), name(name), password(password) {}

int User::getId() const { return id; }

std::string User::getName() const { return name; }

std::string User::getPassword() const { return password; }

void User::setPassword(std::string newPassword) { password = newPassword; }

void User::displayInfo() const {
    std::cout << "ID: " << id << ", Name: " << name << std::endl;
}