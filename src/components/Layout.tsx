import React from 'react';
import { Sidebar } from './Sidebar';
import { Bell, Search, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export function Topbar() {
  const data = useStore(state => state.data);

  return (
    <div className="h-16 bg-white border-b border-[var(--border)] flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center">
        {data && (
          <div className="flex items-center">
            <span className="font-semibold text-slate-800 mr-2">{data.organization.name}</span>
            {data.organization.standards?.map((s: string) => (
              <span key={s} className="ml-2 px-2 py-0.5 rounded bg-slate-50 text-[11px] font-medium text-slate-500 border border-[var(--border)] uppercase tracking-wider">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-9 pr-4 py-1.5 rounded bg-slate-50 border border-[var(--border)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] transition-all w-64"
          />
        </div>
        
        <Link to="/alerts" className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </Link>

        <button className="flex items-center px-3 py-1.5 border border-[var(--brand-accent)] text-[var(--brand-accent)] text-sm font-medium rounded hover:bg-[var(--brand-accent)] hover:text-white transition-colors">
          <Sparkles className="w-4 h-4 mr-1.5" />
          Copilot
        </button>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--app-bg)] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
