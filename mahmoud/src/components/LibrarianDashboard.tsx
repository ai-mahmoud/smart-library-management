import React, { useState } from 'react';
import { Screen, Book, Member, Loan } from '../types';
import { Book as BookIcon, Users, LogOut, Plus, Trash2, List, FileText } from 'lucide-react';

type Tab = 'catalog' | 'add-book' | 'members' | 'add-member' | 'loans';

export default function LibrarianDashboard({ 
  onNavigate, 
  books, 
  setBooks, 
  members, 
  setMembers,
  loans
}: { 
  onNavigate: (screen: Screen) => void,
  books: Book[],
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
  members: Member[],
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>,
  loans: Loan[]
}) {
  const [activeTab, setActiveTab] = useState<Tab>('catalog');

  // Add Book State
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  // Add Member State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPassword, setNewMemberPassword] = useState('');

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    setBooks([...books, { id: newId, title: newBookTitle, author: newBookAuthor, available: true }]);
    setNewBookTitle('');
    setNewBookAuthor('');
    setActiveTab('catalog');
    alert('Book added successfully!');
  };

  const handleRemoveBook = (id: number) => {
    if (confirm('Are you sure you want to remove this book?')) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    setMembers([...members, { id: newId, name: newMemberName, password: newMemberPassword, fines: 0 }]);
    setNewMemberName('');
    setNewMemberPassword('');
    setActiveTab('members');
    alert(`Member added successfully! ID: ${newId}`);
  };

  const handleRemoveMember = (id: number) => {
    if (confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold">Admin Portal</h3>
          <p className="text-slate-400 text-sm mt-1">Librarian Dashboard</p>
        </div>
        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'catalog' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <BookIcon className="w-5 h-5" />
            Display Catalog
          </button>
          <button 
            onClick={() => setActiveTab('add-book')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'add-book' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <Plus className="w-5 h-5" />
            Add Book
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'members' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5" />
            Manage Members
          </button>
          <button 
            onClick={() => setActiveTab('add-member')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'add-member' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
          <button 
            onClick={() => setActiveTab('loans')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'loans' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" />
            Loan Transactions
          </button>
        </div>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          {activeTab === 'catalog' && 'Library Catalog'}
          {activeTab === 'add-book' && 'Add New Book'}
          {activeTab === 'members' && 'Member Management'}
          {activeTab === 'add-member' && 'Add New Member'}
          {activeTab === 'loans' && 'Loan Transactions'}
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {activeTab === 'catalog' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-4 font-semibold text-slate-600">ID</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Title</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Author</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Status</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-600">{book.id}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{book.title}</td>
                      <td className="py-3 px-4 text-slate-600">{book.author}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${book.available ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {book.available ? 'Available' : 'Borrowed'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleRemoveBook(book.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove Book"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {books.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">No books in the catalog.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'add-book' && (
            <form onSubmit={handleAddBook} className="max-w-md space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Book Title</label>
                <input 
                  type="text" 
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter book title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Author</label>
                <input 
                  type="text" 
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter author name"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Add Book
              </button>
            </form>
          )}

          {activeTab === 'members' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-4 font-semibold text-slate-600">ID</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Name</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Fines</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-600">{member.id}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{member.name}</td>
                      <td className="py-3 px-4 text-slate-600">${member.fines.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">No members found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'add-member' && (
            <form onSubmit={handleAddMember} className="max-w-md space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Member Name</label>
                <input 
                  type="text" 
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter member name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={newMemberPassword}
                  onChange={(e) => setNewMemberPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Set member password"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Add Member
              </button>
            </form>
          )}

          {activeTab === 'loans' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-4 font-semibold text-slate-600">Transaction ID</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Book ID</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Member ID</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map(loan => (
                    <tr key={loan.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-600">{loan.id}</td>
                      <td className="py-3 px-4 text-slate-600">{loan.bookId}</td>
                      <td className="py-3 px-4 text-slate-600">{loan.memberId}</td>
                      <td className="py-3 px-4 text-slate-600">{loan.date}</td>
                    </tr>
                  ))}
                  {loans.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">No loan transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
