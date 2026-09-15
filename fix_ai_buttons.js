import fs from 'fs';

let content = fs.readFileSync('src/components/implementation/RequirementDrawer.tsx', 'utf8');

// Add state
content = content.replace(
  "const [saving, setSaving] = useState(false);",
  "const [saving, setSaving] = useState(false);\n  const [aiMessage, setAiMessage] = useState('');"
);

// Add handlers
content = content.replace(
  '<button className="px-3 py-1.5 bg-white text-teal-700 text-xs font-medium rounded-lg border border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all shadow-sm">Explícame este requisito</button>',
  '<button onClick={() => setAiMessage("Conectando con el Agente AI... (Módulo en construcción)")} className="px-3 py-1.5 bg-white text-teal-700 text-xs font-medium rounded-lg border border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all shadow-sm">Explícame este requisito</button>'
);

content = content.replace(
  '<button className="px-3 py-1.5 bg-white text-teal-700 text-xs font-medium rounded-lg border border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all shadow-sm">Sugiere acciones</button>',
  '<button onClick={() => setAiMessage("Conectando con el Agente AI... (Módulo en construcción)")} className="px-3 py-1.5 bg-white text-teal-700 text-xs font-medium rounded-lg border border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all shadow-sm">Sugiere acciones</button>'
);

content = content.replace(
  '<button className="px-3 py-1.5 bg-white text-teal-700 text-xs font-medium rounded-lg border border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all shadow-sm">Sugiere evidencias</button>',
  '<button onClick={() => setAiMessage("Conectando con el Agente AI... (Módulo en construcción)")} className="px-3 py-1.5 bg-white text-teal-700 text-xs font-medium rounded-lg border border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all shadow-sm">Sugiere evidencias</button>'
);

const aiMsgBlock = `
            </div>
            {aiMessage && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-teal-100 text-xs text-teal-800 flex items-center justify-between">
                <span>{aiMessage}</span>
                <button onClick={() => setAiMessage('')} className="text-teal-500 hover:text-teal-700"><X className="w-4 h-4"/></button>
              </div>
            )}
          </div>
`;

content = content.replace(
  "            </div>\n          </div>",
  aiMsgBlock
);

fs.writeFileSync('src/components/implementation/RequirementDrawer.tsx', content);
console.log('AI buttons fixed');
