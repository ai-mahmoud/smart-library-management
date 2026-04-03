# Smart Library Management System - C++ Backend

This directory contains the complete C++ backend for the Smart Library Management System, utilizing `cpp-httplib` for the HTTP server and `nlohmann/json` for JSON parsing.

## Prerequisites

To compile and run this backend, you will need:
- A C++17 compatible compiler (e.g., GCC, Clang, MSVC)
- CMake (version 3.14 or higher)

## Building the Backend

The project uses CMake's `FetchContent` to automatically download the required dependencies (`cpp-httplib` and `nlohmann/json`) during the build process. You do not need to download them manually.

1. Open your terminal and navigate to the `backend` directory.
2. Create a build directory and navigate into it:
   ```bash
   mkdir build
   cd build
   ```
3. Run CMake to configure the project and download dependencies:
   ```bash
   cmake ..
   ```
4. Compile the project:
   ```bash
   cmake --build .
   ```

## Running the Server

After a successful build, you can run the executable:

**On Linux/macOS:**
```bash
./library_server
```

**On Windows:**
```cmd
Debug\library_server.exe
```

The server will start on `http://localhost:8080`.

## API Endpoints Implemented

The server provides a RESTful JSON API that matches the frontend requirements:

- `POST /api/login/librarian` - Authenticate librarian (password: "admin")
- `POST /api/login/member` - Authenticate member
- `GET /api/books` - Retrieve all books
- `POST /api/books` - Add a new book
- `DELETE /api/books/:id` - Remove a book
- `GET /api/members` - Retrieve all members
- `POST /api/members` - Add a new member
- `DELETE /api/members/:id` - Remove a member
- `GET /api/loans` - Retrieve all loan transactions
- `POST /api/loans` - Borrow a book
- `DELETE /api/loans/:bookId/:memberId` - Return a book

## Connecting the Frontend

If you are running the vanilla HTML/JS/CSS frontend locally, ensure your JavaScript `fetch` calls point to `http://localhost:8080/api/...`. The C++ server is configured with CORS headers to allow requests from any origin during local development.

Additionally, if you place your frontend files in a `dist` directory located one level above the `backend` folder, the C++ server will automatically serve them as static files at `http://localhost:8080/`.
