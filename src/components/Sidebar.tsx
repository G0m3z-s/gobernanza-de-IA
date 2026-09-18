import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Target, Cpu, ShieldAlert, CheckSquare, 
  FileBox, Files, Search, Settings, Bell, Calendar, Activity, 
  BarChart2, LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { BrandMark } from './brand/BrandMark';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { label: 'Command Center', icon: LayoutDashboard, path: '/' },
  { label: 'Implementación', icon: Map, path: '/implementation' },
  { label: 'Gobernanza', icon: Target, path: '/governance' },
  { label: 'Inteligencia Artificial', icon: Cpu, path: '/ai-registry' },
  { label: 'Riesgos', icon: ShieldAlert, path: '/risks' },
  { label: 'Controles', icon: CheckSquare, path: '/controls' },
  { label: 'Evidencias', icon: FileBox, path: '/evidences' },
  { label: 'Documentos', icon: Files, path: '/documents' },
  { label: 'Auditoría', icon: Search, path: '/audit' },
  { label: 'Desempeño', icon: Activity, path: '/performance' },
];

export function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('mockUser');
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="w-60 bg-[var(--brand-navy)] text-slate-300 h-screen flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <BrandMark className="w-6 h-6 text-[var(--brand-accent)] mr-2 shrink-0" />
        <span className="font-semibold text-lg text-white tracking-tight">AIGobernanza <span className="text-[var(--brand-accent)] font-light">360</span></span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 border-l-2",
              isActive 
                 ? "bg-white/5 text-white border-[var(--brand-accent)]" 
                 : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5 mr-3 shrink-0" />
            {item.label}
          </NavLink>
        ))}
        <div className="mt-8 pt-4 border-t border-white/10 space-y-1">
          <NavLink to="/reports" className={({ isActive }) => cn("flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 border-l-2", isActive ? "bg-white/5 text-white border-[var(--brand-accent)]" : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white")}>
            <BarChart2 className="w-5 h-5 mr-3 shrink-0" /> Reportes
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => cn("flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 border-l-2", isActive ? "bg-white/5 text-white border-[var(--brand-accent)]" : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white")}>
            <Calendar className="w-5 h-5 mr-3 shrink-0" /> Calendario
          </NavLink>
          <NavLink to="/alerts" className={({ isActive }) => cn("flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 border-l-2", isActive ? "bg-white/5 text-white border-[var(--brand-accent)]" : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white")}>
            <Bell className="w-5 h-5 mr-3 shrink-0" /> Alertas
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => cn("flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 border-l-2", isActive ? "bg-white/5 text-white border-[var(--brand-accent)]" : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white")}>
            <Settings className="w-5 h-5 mr-3 shrink-0" /> Configuración
          </NavLink>
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10 flex justify-between items-center bg-black/10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded bg-[var(--brand-navy-hover)] flex items-center justify-center text-sm font-bold text-white uppercase">
            {user?.email?.charAt(0) || 'U'}
          </div>
          <div className="ml-3 truncate max-w-[120px]">
            <p className="text-sm font-medium text-white leading-none truncate">{user?.displayName || user?.email?.split('@')[0]}</p>
            <p className="text-xs text-slate-400 mt-1 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors p-1" title="Cerrar sesión">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
