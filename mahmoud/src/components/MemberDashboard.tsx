import React, { useState } from 'react';
import { Screen, Book, Member, Loan } from '../types';
import { Book as BookIcon, LogOut, Library, CheckCircle, RotateCcw } from 'lucide-react';

type Tab = 'catalog' | 'my-loans';

export default function MemberDashboard({ 
  onNavigate, 
  member,
  books,
  setBooks,
  loans,
  setLoans
}: { 
  onNavigate: (screen: Screen) => void,
  member: Member,
  books: Book[],
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
  loans: Loan[],
  setLoans: React.Dispatch<React.SetStateAction<Loan[]>>
}) {
  const [activeTab, setActiveTab] = useState<Tab>('catalog');

  const handleBorrow = (bookId: number) => {
    setBooks(books.map(b => b.id === bookId ? { ...b, available: false } : b));
    const newLoanId = loans.length > 0 ? Math.max(...loans.map(l => l.id)) + 1 : 1;
    setLoans([...loans, { 
      id: newLoanId, 
      bookId, 
      memberId: member.id, 
      date: new Date().toLocaleDateString() 
    }]);
    alert('Book borrowed successfully!');
  };

  const handleReturn = (bookId: number) => {
    setBooks(books.map(b => b.id === bookId ? { ...b, available: true } : b));
    setLoans(loans.filter(l => !(l.bookId === bookId && l.memberId === member.id)));
    alert('Book returned successfully!');
  };

  const myLoans = loans.filter(l => l.memberId === member.id);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold">Member Portal</h3>
          <p className="text-slate-400 text-sm mt-1">Welcome, {member.name}</p>
        </div>
        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'catalog' ? 'bg-fuchsia-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <Library className="w-5 h-5" />
            Library Catalog
          </button>
          <button 
            onClick={() => setActiveTab('my-loans')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'my-loans' ? 'bg-fuchsia-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <BookIcon className="w-5 h-5" />
            My Borrowed Books
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
          {activeTab === 'catalog' && 'Available Books'}
          {activeTab === 'my-loans' && 'My Borrowed Books'}
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {activeTab === 'catalog' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map(book => (
                <div key={book.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <BookIcon className="w-6 h-6 text-slate-600" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${book.available ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {book.available ? 'Available' : 'Borrowed'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-1">{book.title}</h3>
                  <p className="text-slate-500 mb-6">{book.author}</p>
                  
                  <button 
                    onClick={() => handleBorrow(book.id)}
                    disabled={!book.available}
                    className="w-full flex items-center justify-center gap-2 bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-700 disabled:bg-slate-100 disabled:text-slate-400 py-2.5 rounded-lg font-semibold transition-colors"
                  >
                    {book.available ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Borrow Book
                      </>
                    ) : (
                      'Currently Unavailable'
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'my-loans' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-4 font-semibold text-slate-600">Book Title</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Author</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Borrowed Date</th>
                    <th className="py-4 px-4 font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myLoans.map(loan => {
                    const book = books.find(b => b.id === loan.bookId);
                    if (!book) return null;
                    return (
                      <tr key={loan.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium text-slate-800">{book.title}</td>
                        <td className="py-3 px-4 text-slate-600">{book.author}</td>
                        <td className="py-3 px-4 text-slate-600">{loan.date}</td>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => handleReturn(book.id)}
                            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors font-medium text-sm"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Return
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {myLoans.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">You haven't borrowed any books yet.</td>
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
