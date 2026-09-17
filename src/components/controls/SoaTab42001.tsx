import React, { useState } from 'react';
import { DashboardData } from '../../types';
import { Search, ShieldAlert, ShieldCheck, Check, X, FileText, AlertTriangle } from 'lucide-react';
import { SlideOver } from '../ui/SlideOver';
import { ControlForm42001 } from '../forms/ControlForm42001';
import { getISO42001AdaptedControls, resolveAssessment } from '../../data/normativeCatalogAdapter';

export function SoaTab42001({ data }: { data: DashboardData }) {
  const allControls = getISO42001AdaptedControls();
  
  const mappedControls = allControls.map(c => {
    const assessment = resolveAssessment(c, data.controlAssessments, true) || {};
    return {
      ...c,
      groupCode: c.code.substring(0, 3), // e.g. A.2, A.3
      assessment,
      applicability: assessment.applicability || 'not_evaluated',
      status: assessment.status || 'not_evaluated',
      testResult: assessment.testResult || 'not_tested',
      ownerId: assessment.ownerId || '',
      justification: assessment.justification || ''
    };
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  
  const [selectedControl, setSelectedControl] = useState<any>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const groups = Array.from(new Set(mappedControls.map(c => c.groupCode))).sort();

  const displayControls = mappedControls.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === 'All' || c.groupCode === domainFilter;
    return matchesSearch && matchesDomain;
  });

  const applicableControls = mappedControls.filter(c => c.applicability === 'applicable');
  const totalApplicable = applicableControls.length;
  const implementedCount = applicableControls.filter(c => ['implemented', 'evidenced', 'verified'].includes(c.status)).length;
  const notApplicableCount = mappedControls.filter(c => c.applicability === 'not_applicable').length;
  const notEvaluatedCount = mappedControls.filter(c => c.applicability === 'not_evaluated').length;

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string, text: string, label: string }> = {
      not_evaluated: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'No Evaluado' },
      gap: { bg: 'bg-red-100', text: 'text-red-700', label: 'Brecha' },
      planned: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Planificado' },
      documented: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Documentado' },
      implemented: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Implementado' },
      evidenced: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Con Evidencia' },
      verified: { bg: 'bg-teal-100', text: 'text-teal-700', label: 'Verificado' }
    };
    const conf = config[status] || config.not_evaluated;
    return <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${conf.bg} ${conf.text}`}>{conf.label}</span>;
  };

  const getEfficacyBadge = (result: string) => {
    const config: Record<string, { bg: string, text: string, label: string }> = {
      not_tested: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Sin Evaluar' },
      ineffective: { bg: 'bg-red-100', text: 'text-red-700', label: 'Ineficaz' },
      partially_effective: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Parcialmente' },
      effective: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Eficaz' }
    };
    const conf = config[result] || config.not_tested;
    return <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${conf.bg} ${conf.text}`}>{conf.label}</span>;
  };

  return (
    <div className="space-y-4">
      {/* Context Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Controles Totales</p>
            <p className="text-2xl font-bold text-slate-800">{mappedControls.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <FileText className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Aplicables</p>
            <p className="text-2xl font-bold text-teal-600">{totalApplicable}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
            <Check className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">No Aplicables</p>
            <p className="text-2xl font-bold text-slate-600">{notApplicableCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <X className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">No Evaluados</p>
            <p className="text-2xl font-bold text-amber-600">{notEvaluatedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {totalApplicable > 0 && (
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex justify-between items-center">
          <div>
            <p className="text-emerald-800 font-medium">Cobertura de Implementación</p>
            <p className="text-sm text-emerald-600">Calculado sobre {totalApplicable} controles aplicables de {mappedControls.length} totales</p>
          </div>
          <div className="text-2xl font-bold text-emerald-700">
            {Math.round((implementedCount / totalApplicable) * 100)}%
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar código o nombre..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none min-w-[200px]"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            <option value="All">Todos los grupos</option>
            {groups.map(d => (
              <option key={d} value={d}>Grupo {d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {displayControls.length > 0 ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-medium">Control</th>
                <th className="px-6 py-3 font-medium text-center">Aplica</th>
                <th className="px-6 py-3 font-medium">Implementación</th>
                <th className="px-6 py-3 font-medium">Eficacia</th>
                <th className="px-6 py-3 font-medium">Responsable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayControls.map((control) => (
                <tr 
                  key={control.id} 
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => {
                    setSelectedControl(control);
                    setIsSlideOverOpen(true);
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{control.code}</span>
                      <span className="font-medium text-teal-700 line-clamp-1">{control.title}</span>
                      <span className="text-[10px] font-semibold text-slate-500 mt-1 uppercase tracking-wider bg-slate-100 self-start px-1.5 py-0.5 rounded">
                        {control.groupCode}
                      </span>
                    </div>
                    {control.applicability === 'not_applicable' && control.justification && (
                      <p className="text-xs text-red-600 mt-1 line-clamp-1">
                        Exclusión: {control.justification}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {control.applicability === 'applicable' ? (
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600" title="Aplicable">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : control.applicability === 'not_applicable' ? (
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600" title="No Aplica">
                        <X className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400" title="No Evaluado">
                        <span className="text-xs font-bold">?</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {control.applicability === 'applicable' ? (
                      getStatusBadge(control.status)
                    ) : (
                      <span className="text-slate-400 text-xs italic">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {control.applicability === 'applicable' ? (
                      getEfficacyBadge(control.testResult)
                    ) : (
                      <span className="text-slate-400 text-xs italic">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {control.applicability === 'applicable' ? (
                      control.ownerId ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-medium uppercase">
                            {control.ownerId.charAt(0)}
                          </div>
                          <span className="text-slate-700 truncate max-w-[120px]" title={control.ownerId}>{control.ownerId}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">Sin asignar</span>
                      )
                    ) : (
                      <span className="text-slate-400 text-xs italic">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <ShieldAlert className="w-12 h-12 text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No se encontraron controles con los filtros actuales</p>
          </div>
        )}
      </div>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title="Evaluación de Control"
        description="Evalúa la aplicabilidad, estado y madurez de este control normativo."
      >
        {selectedControl && (
          <ControlForm42001 
            control={selectedControl}
            assessment={selectedControl.assessment}
            onSuccess={() => setIsSlideOverOpen(false)}
            onCancel={() => setIsSlideOverOpen(false)}
          />
        )}
      </SlideOver>
    </div>
  );
}
