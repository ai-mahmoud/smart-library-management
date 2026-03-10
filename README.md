# Smart Library Management System

A comprehensive library management system with both web frontend and C++ backend implementations for Horus University - Faculty of AI (Spring 2026).

## Project Structure

```
/
├── index.html          # Home page with navigation
├── librarian.html      # Librarian login page
├── member.html         # Member login page
├── style.css           # Shared CSS styles
├── script.js           # JavaScript for navigation and login
├── *.h                 # C++ header files
├── *.cpp               # C++ source files
├── books.txt           # Book data storage
├── members.txt         # Member data storage
└── loans.txt           # Loan transaction storage
```

## Features

### Web Frontend
- **Responsive Design**: Modern UI with gradient backgrounds and clean styling
- **Navigation**: Separate pages for home, librarian login, and member login
- **Login Forms**: Simple password form for librarians, ID+password for members
- **Error Handling**: Client-side validation and error messages

### C++ Backend
- **OOP Design**: Proper inheritance with User, LibraryItem, LoanTransaction base classes
- **File Persistence**: Data stored in text files for books, members, and loans
- **Librarian Mode**:
  - Secure login (password: "admin")
  - Add/remove books and members
  - View catalog and loan transactions
- **Member Mode**:
  - Login with ID + password
  - Borrow/return books
  - Pay fines and change password
  - 3-attempt login limit
- **Console Interface**: Clear menus with input validation and colored output

## Installation & Setup

### Prerequisites
- Web browser (for frontend)
- C++ compiler (g++ recommended) (for backend)
- Terminal/command prompt

### Running the Web Frontend

1. Start the local server:
   ```bash
   cd /path/to/project
   python3 -m http.server 8000
   ```

2. Open your browser and go to: `http://localhost:8000`

3. Navigate between pages using the buttons

### Compiling and Running the C++ Backend

1. Compile the system:
   ```bash
   g++ -o library_system main.cpp LibrarySystem.cpp Member.cpp Librarian.cpp LoanTransaction.cpp LibraryItem.cpp User.cpp
   ```

2. Run the executable:
   ```bash
   ./library_system
   ```

3. Follow the console menus to interact with the system

## Usage

### Web Frontend
- **Home Page**: Choose between Librarian or Member login
- **Librarian Login**: Enter password "admin" (demo)
- **Member Login**: Enter ID and password set by librarian

### C++ Backend
- **Main Menu**: Choose Librarian or Member mode
- **Librarian Mode**:
  - Login with password "admin"
  - Manage books and members
  - View system data
- **Member Mode**:
  - Login with assigned ID and password
  - Borrow/return books
  - Manage account

## Default Credentials

- **Librarian**: Password = "admin"
- **Members**: Create via librarian mode, no defaults

## Data Persistence

The C++ system automatically saves data to text files:
- `books.txt`: Book inventory
- `members.txt`: Member information
- `loans.txt`: Transaction history

Data is loaded on startup and saved on changes.

## Development Notes

- **Frontend**: Uses vanilla HTML/CSS/JavaScript
- **Backend**: C++ with STL containers and file I/O
- **OOP Principles**: Inheritance, encapsulation, polymorphism
- **Error Handling**: Input validation and graceful failure
- **Code Style**: Comprehensive comments and clean structure

## Course Information

- **Course**: Programming 2
- **Institution**: Horus University - Faculty of AI
- **Semester**: Spring 2026

## License

This project is for educational purposes.</content>
<parameter name="filePath">/home/fady/Documents/Prog2/README.md