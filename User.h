#ifndef USER_H
#define USER_H

#include <string>

class User {
protected:
    int id;
    std::string name;
    std::string password;

public:
    User(int id = 0, std::string name = "", std::string password = "");
    virtual ~User() = default;

    int getId() const;
    std::string getName() const;
    std::string getPassword() const;
    void setPassword(std::string newPassword);

    virtual void displayInfo() const;
};

#endif // USER_H