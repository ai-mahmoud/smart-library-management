// script.js - JavaScript logic for Smart Library Management System

/**
 * Navigates to the librarian login page
 */
function navigateToLibrarian() {
    window.location.href = 'librarian.html';
}

/**
 * Navigates to the member login page
 */
function navigateToMember() {
    window.location.href = 'member.html';
}

/**
 * Handles librarian login form submission
 * @param {Event} event - The form submit event
 */
function handleLibrarianLogin(event) {
    event.preventDefault();
    const password = document.getElementById('librarian-password').value;
    const errorDiv = document.getElementById('librarian-error');

    // Simple password check (in a real app, this would be server-side)
    if (password === 'admin') {
        // Successful login - for demo, just show alert
        alert('Librarian login successful!');
        // In a full app, navigate to dashboard
        // window.location.href = 'librarian-dashboard.html';
    } else {
        // Failed login - show error
        errorDiv.textContent = 'Invalid password. Please try again.';
        errorDiv.style.display = 'block';
    }
}

/**
 * Handles member login form submission
 * @param {Event} event - The form submit event
 */
function handleMemberLogin(event) {
    event.preventDefault();
    const memberId = document.getElementById('member-id').value;
    const password = document.getElementById('member-password').value;
    const errorDiv = document.getElementById('member-error');

    // Simple check (in a real app, this would verify against database)
    if (memberId === '12345' && password === 'password') {
        // Successful login - for demo, just show alert
        alert('Member login successful!');
        // In a full app, navigate to member dashboard
        // window.location.href = 'member-dashboard.html';
    } else {
        // Failed login - show error
        errorDiv.textContent = 'Invalid Member ID or password. Please try again.';
        errorDiv.style.display = 'block';
    }
}