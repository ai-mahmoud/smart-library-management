const API_URL = "http://localhost:8080/api";

// Navigation
function navigateToLibrarian() { window.location.href = 'librarian.html'; }
function navigateToMember() { window.location.href = 'member.html'; }
function logout() {
    localStorage.removeItem('memberId');
    localStorage.removeItem('memberName');
    window.location.href = 'index.html';
}

// Librarian Login
async function handleLibrarianLogin(event) {
    event.preventDefault();
    const password = document.getElementById('librarian-password').value;
    const errorDiv = document.getElementById('librarian-error');

    try {
        const response = await fetch(`${API_URL}/login/librarian`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (response.ok) {
            window.location.href = 'librarian-dashboard.html';
        } else {
            errorDiv.style.display = 'block';
            errorDiv.innerText = "Invalid Password";
        }
    } catch (e) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = "Connection error. Is the C++ server running?";
    }
}

// Member Login
let loginAttempts = 3;
async function handleMemberLogin(event) {
    event.preventDefault();
    const id = document.getElementById('member-id').value;
    const password = document.getElementById('member-password').value;
    const errorDiv = document.getElementById('member-error');

    if (isNaN(id)) {
        errorDiv.innerText = "Invalid input. Please enter a number.";
        errorDiv.style.display = "block";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login/member`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: parseInt(id), password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('memberId', data.id);
            localStorage.setItem('memberName', data.name);
            alert(`Login successful! Welcome ${data.name}`);
            window.location.href = 'member-dashboard.html';
        } else {
            loginAttempts--;
            if (loginAttempts <= 0) {
                alert("Too many failed attempts. System locked.");
                window.location.href = 'index.html';
            } else {
                errorDiv.innerText = `Invalid credentials. Attempts left: ${loginAttempts}`;
                errorDiv.style.display = "block";
            }
        }
    } catch (e) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = "Connection error. Is the C++ server running?";
    }
}

// Librarian Dashboard
async function loadLibrarianDashboard() {
    try {
        const booksRes = await fetch(`${API_URL}/books`);
        const books = await booksRes.json();
        document.getElementById('book-table-body').innerHTML = books.map(book => `
        <tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.available ? '<span style="color:green">Available</span>' : '<span style="color:red">Borrowed</span>'}</td>
        <td><button onclick="deleteBook(${book.id})" style="color:red; cursor:pointer; border:none; background:none; font-weight:bold;">Delete</button></td>
        </tr>
        `).join('');

        const membersRes = await fetch(`${API_URL}/members`);
        const members = await membersRes.json();
        document.getElementById('member-table-body').innerHTML = members.map(member => `
        <tr>
        <td>${member.id}</td>
        <td>${member.name}</td>
        <td>$${member.fines.toFixed(2)}</td>
        <td><button onclick="deleteMember(${member.id})" style="color:red; cursor:pointer; border:none; background:none; font-weight:bold;">Delete</button></td>
        </tr>
        `).join('');
    } catch (e) {
        console.error("Failed to load dashboard data", e);
    }
}

async function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
    });
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    loadLibrarianDashboard();
}

async function deleteBook(id) {
    if(confirm("Delete this book?")) {
        await fetch(`${API_URL}/books/${id}`, { method: 'DELETE' });
        loadLibrarianDashboard();
    }
}

async function addMember(event) {
    event.preventDefault();
    const name = document.getElementById('mem-name').value;
    const password = document.getElementById('mem-pass').value;
    await fetch(`${API_URL}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    });
    document.getElementById('mem-name').value = '';
    document.getElementById('mem-pass').value = '';
    loadLibrarianDashboard();
}

async function deleteMember(id) {
    if(confirm("Delete this member?")) {
        await fetch(`${API_URL}/members/${id}`, { method: 'DELETE' });
        loadLibrarianDashboard();
    }
}

// Member Dashboard
async function loadMemberDashboard() {
    const memberName = localStorage.getItem('memberName');
    const memberId = localStorage.getItem('memberId');

    if (!memberId) {
        window.location.href = 'member.html';
        return;
    }

    document.getElementById('welcome-msg').innerText = `Welcome, ${memberName}`;

    try {
        const booksRes = await fetch(`${API_URL}/books`);
        const books = await booksRes.json();

        const loansRes = await fetch(`${API_URL}/loans`);
        const loans = await loansRes.json();

        const myLoans = loans.filter(l => l.memberId == memberId);

        document.getElementById('available-books-body').innerHTML = books.filter(b => b.available).map(book => `
        <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button onclick="borrowBook(${book.id})" class="btn btn-primary" style="padding: 5px 10px;">Borrow</button></td>
        </tr>
        `).join('');

        document.getElementById('my-books-body').innerHTML = myLoans.map(loan => {
            const book = books.find(b => b.id == loan.bookId);
            return `
            <tr>
            <td>${book ? book.title : 'Unknown'}</td>
            <td>${loan.date}</td>
            <td><button onclick="returnBook(${loan.bookId})" class="btn btn-secondary" style="padding: 5px 10px;">Return</button></td>
            </tr>
            `;
        }).join('');

    } catch (e) {
        console.error("Failed to load member data", e);
    }
}

async function borrowBook(bookId) {
    const memberId = localStorage.getItem('memberId');
    const date = new Date().toLocaleDateString();

    const res = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: parseInt(bookId), memberId: parseInt(memberId), date })
    });

    if (res.ok) {
        loadMemberDashboard();
    } else {
        alert("Failed to borrow book");
    }
}

async function returnBook(bookId) {
    const memberId = localStorage.getItem('memberId');
    const res = await fetch(`${API_URL}/loans/${bookId}/${memberId}`, { method: 'DELETE' });

    if (res.ok) {
        loadMemberDashboard();
    } else {
        alert("Failed to return book");
    }
}
