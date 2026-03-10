#ifndef LIBRARYITEM_H
#define LIBRARYITEM_H

#include <string>

class LibraryItem {
protected:
    int id;
    std::string title;
    std::string author;
    bool available;

public:
    LibraryItem(int id = 0, std::string title = "", std::string author = "", bool available = true);
    virtual ~LibraryItem() = default;

    int getId() const;
    std::string getTitle() const;
    std::string getAuthor() const;
    bool isAvailable() const;
    void setAvailable(bool avail);

    virtual void displayInfo() const;
};

#endif // LIBRARYITEM_H