import React from 'react';
import { Feather, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex items-center justify-center md:justify-between border-b border-slate-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <Feather size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">IntercessorAI</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Liturgical Prayer Agent</p>
        </div>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
        <span className="flex items-center gap-2"><BookOpen size={16} /> Scripture Rooted</span>
        <span className="flex items-center gap-2 text-emerald-600">● Global News Grounded</span>
      </nav>
    </header>
  );
};