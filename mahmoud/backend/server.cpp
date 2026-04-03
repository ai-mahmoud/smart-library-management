#include <httplib.h>
#include <nlohmann/json.hpp>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace httplib;
using json = nlohmann::json;

// --- Data Structures ---
struct Book {
    int id;
    std::string title;
    std::string author;
    bool available;
};

struct Member {
    int id;
    std::string name;
    std::string password;
    double fines;
};

struct Loan {
    int id;
    int bookId;
    int memberId;
    std::string date;
};

// --- In-Memory Database ---
std::vector<Book> books = {
    {1, "The C++ Programming Language", "Bjarne Stroustrup", true},
    {2, "Clean Code", "Robert C. Martin", true}
};

std::vector<Member> members = {
    {1, "meow", "meow", 0.0}
};

std::vector<Loan> loans;

// --- Helper Functions ---
void set_cors(Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set_header("Access-Control-Allow-Headers", "Content-Type");
}

int main() {
    Server svr;

    // --- Static File Serving ---
    // Serve the built frontend (e.g., React build output in the dist folder)
    if (svr.set_mount_point("/", "../dist")) {
        std::cout << "Serving static files from ../dist" << std::endl;
    } else {
        std::cout << "Warning: ../dist directory not found. Static files will not be served." << std::endl;
    }

    // --- CORS Preflight ---
    svr.Options(".*", [](const Request& req, Response& res) {
        set_cors(res);
        res.status = 200;
    });

    // --- API Endpoints ---

    // 1. Librarian Login
    svr.Post("/api/login/librarian", [](const Request& req, Response& res) {
        set_cors(res);
        try {
            auto body = json::parse(req.body);
            if (body["password"] == "admin") {
                res.status = 200;
                res.set_content(R"({"status":"success"})", "application/json");
            } else {
                res.status = 401;
                res.set_content(R"({"error":"Invalid password"})", "application/json");
            }
        } catch (...) {
            res.status = 400;
            res.set_content(R"({"error":"Invalid JSON"})", "application/json");
        }
    });

    // 2. Member Login
    svr.Post("/api/login/member", [](const Request& req, Response& res) {
        set_cors(res);
        try {
            auto body = json::parse(req.body);
            int id = -1;
            
            // Handle both string and int IDs from the client
            if (body["id"].is_string()) {
                id = std::stoi(body["id"].get<std::string>());
            } else {
                id = body["id"].get<int>();
            }
            
            std::string password = body["password"];

            for (const auto& m : members) {
                if (m.id == id && m.password == password) {
                    json response = {{"status", "success"}, {"name", m.name}, {"id", m.id}};
                    res.status = 200;
                    res.set_content(response.dump(), "application/json");
                    return;
                }
            }
            res.status = 401;
            res.set_content(R"({"error":"Invalid credentials"})", "application/json");
        } catch (...) {
            res.status = 400;
            res.set_content(R"({"error":"Invalid request format"})", "application/json");
        }
    });

    // 3. Get All Books
    svr.Get("/api/books", [](const Request& req, Response& res) {
        set_cors(res);
        json j = json::array();
        for (const auto& b : books) {
            j.push_back({
                {"id", b.id}, 
                {"title", b.title}, 
                {"author", b.author}, 
                {"available", b.available}
            });
        }
        res.set_content(j.dump(), "application/json");
    });

    // 4. Add a New Book
    svr.Post("/api/books", [](const Request& req, Response& res) {
        set_cors(res);
        try {
            auto body = json::parse(req.body);
            int new_id = books.empty() ? 1 : books.back().id + 1;
            books.push_back({new_id, body["title"], body["author"], true});
            
            json response = {{"status", "success"}, {"id", new_id}};
            res.status = 201;
            res.set_content(response.dump(), "application/json");
        } catch (...) {
            res.status = 400;
            res.set_content(R"({"error":"Invalid JSON"})", "application/json");
        }
    });

    // 5. Delete a Book
    svr.Delete(R"(/api/books/(\d+))", [](const Request& req, Response& res) {
        set_cors(res);
        int bookId = std::stoi(req.matches[1]);
        
        auto it = std::remove_if(books.begin(), books.end(), [bookId](const Book& b) { return b.id == bookId; });
        if (it != books.end()) {
            books.erase(it, books.end());
            res.status = 200;
            res.set_content(R"({"status":"success"})", "application/json");
        } else {
            res.status = 404;
            res.set_content(R"({"error":"Book not found"})", "application/json");
        }
    });

    // 6. Get All Members
    svr.Get("/api/members", [](const Request& req, Response& res) {
        set_cors(res);
        json j = json::array();
        for (const auto& m : members) {
            j.push_back({
                {"id", m.id}, 
                {"name", m.name}, 
                {"fines", m.fines}
            });
        }
        res.set_content(j.dump(), "application/json");
    });

    // 7. Add a New Member
    svr.Post("/api/members", [](const Request& req, Response& res) {
        set_cors(res);
        try {
            auto body = json::parse(req.body);
            int new_id = members.empty() ? 1 : members.back().id + 1;
            members.push_back({new_id, body["name"], body["password"], 0.0});
            
            json response = {{"status", "success"}, {"id", new_id}};
            res.status = 201;
            res.set_content(response.dump(), "application/json");
        } catch (...) {
            res.status = 400;
            res.set_content(R"({"error":"Invalid JSON"})", "application/json");
        }
    });

    // 8. Delete a Member
    svr.Delete(R"(/api/members/(\d+))", [](const Request& req, Response& res) {
        set_cors(res);
        int memberId = std::stoi(req.matches[1]);
        
        auto it = std::remove_if(members.begin(), members.end(), [memberId](const Member& m) { return m.id == memberId; });
        if (it != members.end()) {
            members.erase(it, members.end());
            res.status = 200;
            res.set_content(R"({"status":"success"})", "application/json");
        } else {
            res.status = 404;
            res.set_content(R"({"error":"Member not found"})", "application/json");
        }
    });

    // 9. Get All Loans
    svr.Get("/api/loans", [](const Request& req, Response& res) {
        set_cors(res);
        json j = json::array();
        for (const auto& l : loans) {
            j.push_back({
                {"id", l.id}, 
                {"bookId", l.bookId}, 
                {"memberId", l.memberId}, 
                {"date", l.date}
            });
        }
        res.set_content(j.dump(), "application/json");
    });

    // 10. Borrow a Book
    svr.Post("/api/loans", [](const Request& req, Response& res) {
        set_cors(res);
        try {
            auto body = json::parse(req.body);
            int bookId = body["bookId"];
            int memberId = body["memberId"];
            std::string date = body["date"];

            for (auto& b : books) {
                if (b.id == bookId) {
                    if (b.available) {
                        b.available = false;
                        int new_id = loans.empty() ? 1 : loans.back().id + 1;
                        loans.push_back({new_id, bookId, memberId, date});
                        
                        res.status = 201;
                        res.set_content(R"({"status":"success"})", "application/json");
                        return;
                    } else {
                        res.status = 400;
                        res.set_content(R"({"error":"Book is already borrowed"})", "application/json");
                        return;
                    }
                }
            }
            res.status = 404;
            res.set_content(R"({"error":"Book not found"})", "application/json");
        } catch (...) {
            res.status = 400;
            res.set_content(R"({"error":"Invalid JSON"})", "application/json");
        }
    });

    // 11. Return a Book
    svr.Delete(R"(/api/loans/(\d+)/(\d+))", [](const Request& req, Response& res) {
        set_cors(res);
        int bookId = std::stoi(req.matches[1]);
        int memberId = std::stoi(req.matches[2]);

        for (auto it = loans.begin(); it != loans.end(); ++it) {
            if (it->bookId == bookId && it->memberId == memberId) {
                loans.erase(it);
                for (auto& b : books) {
                    if (b.id == bookId) b.available = true;
                }
                res.status = 200;
                res.set_content(R"({"status":"success"})", "application/json");
                return;
            }
        }
        res.status = 404;
        res.set_content(R"({"error":"Loan not found"})", "application/json");
    });

    // Start server
    int port = 8080;
    std::cout << "Starting C++ API server on http://localhost:" << port << std::endl;
    svr.listen("0.0.0.0", port);

    return 0;
}
