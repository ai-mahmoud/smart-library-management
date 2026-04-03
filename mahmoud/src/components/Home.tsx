import React from 'react';
import { Screen } from '../types';
import { BookOpen, User, Shield } from 'lucide-react';

export default function Home({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center text-white max-w-2xl w-full">
        <div className="mb-10">
          <BookOpen className="w-20 h-20 mx-auto mb-6 text-white/90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Smart Library Management System</h1>
          <p className="text-xl text-white/80">Horus University - Faculty of AI</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('librarian-login')}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1"
          >
            <Shield className="w-5 h-5" />
            Librarian Login
          </button>
          <button 
            onClick={() => onNavigate('member-login')}
            className="flex items-center justify-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-fuchsia-500/30 hover:-translate-y-1"
          >
            <User className="w-5 h-5" />
            Member Login
          </button>
        </div>
      </div>
    </div>
  );
}
