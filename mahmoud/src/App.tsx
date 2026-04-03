/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Book, Member, Loan, Screen } from './types';
import Home from './components/Home';
import LibrarianLogin from './components/LibrarianLogin';
import MemberLogin from './components/MemberLogin';
import LibrarianDashboard from './components/LibrarianDashboard';
import MemberDashboard from './components/MemberDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', available: true },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', available: true },
  ]);
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'meow', password: 'meow', fines: 0 }
  ]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-slate-800 font-sans">
      {currentScreen === 'home' && <Home onNavigate={setCurrentScreen} />}
      {currentScreen === 'librarian-login' && <LibrarianLogin onNavigate={setCurrentScreen} />}
      {currentScreen === 'member-login' && (
        <MemberLogin 
          onNavigate={setCurrentScreen} 
          members={members} 
          onLogin={(member) => {
            setCurrentMember(member);
            setCurrentScreen('member-dashboard');
          }} 
        />
      )}
      {currentScreen === 'librarian-dashboard' && (
        <LibrarianDashboard 
          onNavigate={setCurrentScreen} 
          books={books}
          setBooks={setBooks}
          members={members}
          setMembers={setMembers}
          loans={loans}
        />
      )}
      {currentScreen === 'member-dashboard' && currentMember && (
        <MemberDashboard 
          onNavigate={setCurrentScreen} 
          member={currentMember}
          books={books}
          setBooks={setBooks}
          loans={loans}
          setLoans={setLoans}
        />
      )}
    </div>
  );
}
