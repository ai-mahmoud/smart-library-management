import React, { useState } from 'react';
import { Screen, Member } from '../types';
import { User, ArrowLeft } from 'lucide-react';

export default function MemberLogin({ 
  onNavigate, 
  members, 
  onLogin 
}: { 
  onNavigate: (screen: Screen) => void,
  members: Member[],
  onLogin: (member: Member) => void
}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(3);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isNaN(Number(id))) {
      setError('Invalid input. Please enter a number for Member ID.');
      return;
    }

    const member = members.find(m => m.id === Number(id) && m.password === password);
    
    if (member) {
      onLogin(member);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      if (newAttempts <= 0) {
        setError('Too many failed attempts. System terminating.');
      } else {
        setError(`Invalid credentials. Attempts left: ${newAttempts}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-fuchsia-100 p-3 rounded-full mb-4">
            <User className="w-8 h-8 text-fuchsia-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Member Login</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Member ID</label>
            <input 
              type="text" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              placeholder="Enter your Member ID"
              disabled={attempts <= 0}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              disabled={attempts <= 0}
              required
            />
          </div>
          
          {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
          
          <button 
            type="submit"
            disabled={attempts <= 0}
            className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors shadow-md"
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
