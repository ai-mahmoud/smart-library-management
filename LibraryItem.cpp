#include "LibraryItem.h"
#include <iostream>

LibraryItem::LibraryItem(int id, std::string title, std::string author, bool available)
    : id(id), title(title), author(author), available(available) {}

int LibraryItem::getId() const { return id; }

std::string LibraryItem::getTitle() const { return title; }

std::string LibraryItem::getAuthor() const { return author; }

bool LibraryItem::isAvailable() const { return available; }

void LibraryItem::setAvailable(bool avail) { available = avail; }

void LibraryItem::displayInfo() const {
    std::cout << "ID: " << id << ", Title: " << title << ", Author: " << author
              << ", Available: " << (available ? "Yes" : "No") << std::endl;
}