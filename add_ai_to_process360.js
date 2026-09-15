import fs from 'fs';

let content = fs.readFileSync('src/components/governance/Process360View.tsx', 'utf8');

// Add "SISTEMAS IA" to the tabs array
content = content.replace(
  "{ id: 'relaciones', name: 'RELACIONES' },",
  "{ id: 'relaciones', name: 'RELACIONES' },\n            { id: 'ai', name: 'SISTEMAS IA' },"
);

// Add the content block for 'ai' tab
const aiTabContent = `
        {activeTab === 'ai' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Sistemas IA Relacionados</h3>
              <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg">VINCULAR SISTEMA IA</button>
            </div>
            
            {data.aiSystems?.filter(s => s.processId === process.id || s.process === process.name).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">Este proceso no utiliza sistemas de Inteligencia Artificial.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.aiSystems?.filter(s => s.processId === process.id || s.process === process.name).map(ai => (
                  <div key={ai.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white border border-slate-200 mr-2">{ai.code || 'AI'}</span>
                        <span className="text-[10px] font-bold uppercase text-slate-500">{ai.type}</span>
                      </div>
                      <span className={\`px-2 py-0.5 rounded text-[10px] font-bold uppercase \${ai.approvalStatus === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}\`}>
                        {ai.approvalStatus}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800">{ai.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{ai.purpose}</p>
                    
                    <div className="mt-4 pt-3 border-t border-slate-200 flex space-x-6 text-xs">
                      <div><span className="text-slate-400 block">Proveedor</span><span className="font-medium text-slate-700">{ai.providerName || 'Interno'}</span></div>
                      <div><span className="text-slate-400 block">Propietario</span><span className="font-medium text-slate-700">{ai.ownerId || '-'}</span></div>
                      <div><span className="text-slate-400 block">Riesgo</span><span className={\`font-bold \${ai.riskLevel === 'high' ? 'text-rose-600' : 'text-slate-700'}\`}>{ai.riskLevel?.toUpperCase() || '-'}</span></div>
                      <div><span className="text-slate-400 block">Impacto</span><span className="font-bold text-slate-700">{ai.impactLevel?.toUpperCase() || '-'}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
`;

content = content.replace(
  "{activeTab !== 'overview' && activeTab !== 'impact' && (",
  aiTabContent + "\n        {activeTab !== 'overview' && activeTab !== 'impact' && activeTab !== 'ai' && activeTab !== 'caracterizacion' && ("
);

// We need to also fix the tabName function
content = content.replace(
  "case 'iso': return 'Requisitos ISO vinculados';",
  "case 'iso': return 'Requisitos ISO vinculados';\n    case 'ai': return 'Sistemas IA';"
);

fs.writeFileSync('src/components/governance/Process360View.tsx', content);
console.log('Process360View updated');
