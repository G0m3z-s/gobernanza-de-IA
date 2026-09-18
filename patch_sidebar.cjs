const fs = require('fs');
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

// Imports
content = content.replace(
  /import \{ auth \} from '\.\.\/lib\/firebase';/,
  "import { auth } from '../lib/firebase';\nimport { BrandMark } from './brand/BrandMark';"
);

// Menu items
content = content.replace(
  /const menuItems = \[[\s\S]*?\];/,
  `const menuItems = [
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
];`
);

// Sidebar wrapper
content = content.replace(
  /className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800 shrink-0"/,
  'className="w-60 bg-[var(--brand-navy)] text-slate-300 h-screen flex flex-col shrink-0"'
);

// Header
content = content.replace(
  /<div className="h-16 flex items-center px-6 border-b border-slate-800">[\s\S]*?<\/div>/,
  `<div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <BrandMark className="w-6 h-6 text-[var(--brand-accent)] mr-2 shrink-0" />
        <span className="font-semibold text-lg text-white tracking-tight">AIGobernanza <span className="text-[var(--brand-accent)] font-light">360</span></span>
      </div>`
);

// Navlinks mapping
content = content.replace(
  /className=\{[\s\S]*?\}\s*>\s*<item\.icon/g,
  `className={({ isActive }) => cn(
              "flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 border-l-2",
              isActive 
                 ? "bg-white/5 text-white border-[var(--brand-accent)]" 
                 : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon`
);

// Extra Links
content = content.replace(
  /<div className="mt-8 pt-4 border-t border-slate-800 space-y-1">[\s\S]*?<\/div>/,
  `<div className="mt-8 pt-4 border-t border-white/10 space-y-1">
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
        </div>`
);

// Footer
content = content.replace(
  /<div className="p-4 border-t border-slate-800 flex justify-between items-center">[\s\S]*?<\/div>/,
  `<div className="p-4 border-t border-white/10 flex justify-between items-center bg-black/10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded bg-[var(--brand-navy-hover)] flex items-center justify-center text-sm font-bold text-white uppercase">
            {user?.email?.charAt(0) || 'U'}
          </div>
          <div className="ml-3 truncate max-w-[120px]">
            <p className="text-sm font-medium text-white leading-none truncate">{user?.displayName || user?.email?.split('@')[0]}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors p-1" title="Cerrar sesión">
          <LogOut className="w-4 h-4" />
        </button>
      </div>`
);

fs.writeFileSync('src/components/Sidebar.tsx', content);
console.log('patched Sidebar.tsx');
