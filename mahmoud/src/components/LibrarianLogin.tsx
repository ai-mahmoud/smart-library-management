import React, { useState } from 'react';
import { Screen } from '../types';
import { Shield, ArrowLeft } from 'lucide-react';

export default function LibrarianLogin({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      onNavigate('librarian-dashboard');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-100 p-3 rounded-full mb-4">
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Librarian Login</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Admin Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter admin password"
              required
            />
          </div>
          
          {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
          
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors shadow-md"
          >
            Login
          </button>
        </form>

        <button 
          onClick={() => onNavigate('home')}
          className="w-full mt-4 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 py-3 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
