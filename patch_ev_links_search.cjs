const fs = require('fs');
let content = fs.readFileSync('src/components/forms/EvidenceLinksSection.tsx', 'utf8');

// Add search state
content = content.replace(
  /  const \[showSelector, setShowSelector\] = useState\(false\);/,
  `  const [showSelector, setShowSelector] = useState(false);\n  const [searchTerm, setSearchTerm] = useState('');`
);

// Add Search Icon
content = content.replace(
  /import \{ FileText, Plus, X, Link as LinkIcon \} from 'lucide-react';/,
  `import { FileText, Plus, X, Link as LinkIcon, Search } from 'lucide-react';`
);

// Add search bar and filter logic
const selectorStr = `      {showSelector && !isReadOnly && (
        <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-500 font-medium uppercase">Seleccionar evidencia</p>
          </div>
          <div className="relative mb-3">
            <Search className="w-3 h-3 text-slate-400 absolute left-2 top-2" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          {loading ? (
            <p className="text-xs text-slate-400">Cargando...</p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {evidences
                .filter(e => !myLinkedEvidenceIds.includes(e.id))
                .filter(e => {
                  if (!searchTerm) return true;
                  const lower = searchTerm.toLowerCase();
                  return e.name.toLowerCase().includes(lower) || (e.description || '').toLowerCase().includes(lower);
                })
                .length === 0 ? (
                <p className="text-xs text-slate-400">No hay evidencias disponibles.</p>
              ) : (
                evidences
                  .filter(e => !myLinkedEvidenceIds.includes(e.id))
                  .filter(e => {
                    if (!searchTerm) return true;
                    const lower = searchTerm.toLowerCase();
                    return e.name.toLowerCase().includes(lower) || (e.description || '').toLowerCase().includes(lower);
                  })
                  .map(ev => (
                  <div key={ev.id} className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded text-sm hover:border-teal-300 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-800">{ev.name}</span>
                      <span className={\`text-[10px] uppercase font-bold mt-0.5 \${ev.status === 'Vencida' ? 'text-rose-500' : 'text-emerald-500'}\`}>{ev.status}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLink(ev.id)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors"
                    >
                      Vincular
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}`;

content = content.replace(
  /      \{showSelector && \([\s\S]*?      \)\}/,
  selectorStr
);

fs.writeFileSync('src/components/forms/EvidenceLinksSection.tsx', content);
console.log('patched EvidenceLinksSection search');
