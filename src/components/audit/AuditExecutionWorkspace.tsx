import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { AuditSession, AuditChecklistItem } from '../../types';

import { Search, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Save, X, Info } from 'lucide-react';
import { format } from 'date-fns';
import { EvidenceLinksSection } from '../forms/EvidenceLinksSection';
import { EvidenceLink, NonConformity } from '../../types';
import { NonConformityForm } from '../forms/NonConformityForm';
import { StatusBadge } from '../ui/StatusBadge';
import { FormSection } from '../ui/FormSection';

interface AuditExecutionWorkspaceProps {
  session: AuditSession | null;
  onClose: () => void;
}

export function AuditExecutionWorkspace({ session, onClose }: AuditExecutionWorkspaceProps) {
  const { currentOrgId } = useAuth();
  const { data, updateAuditChecklistItem } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'requirements' | 'controls'>('all');
  
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  
  // Local edit state for the currently expanded item
  const [editResult, setEditResult] = useState<AuditChecklistItem['result']>('NOT_EVALUATED');
  const [editNotes, setEditNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [findingFormItem, setFindingFormItem] = useState<AuditChecklistItem | null>(null);

  // Filter items for this audit
  const items = useMemo(() => {
    if (!session || !data?.auditChecklistItems) return [];
    return data.auditChecklistItems.filter(
      item => item.auditId === session.id && item.organizationId === currentOrgId
    );
  }, [session, data?.auditChecklistItems, currentOrgId]);

  const isProgramada = session?.status === 'Programada';
  const isCompletada = session?.status === 'Completada';
  const isCancelada = session?.status === 'Cancelada';
  const isReadOnly = isProgramada || isCompletada || isCancelada;

  // Filter and search
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Filter
      if (filter === 'pending' && item.status !== 'NOT_STARTED') return false;
      if (filter === 'in_progress' && item.status !== 'IN_PROGRESS') return false;
      if (filter === 'completed' && item.status !== 'COMPLETED') return false;
      if (filter === 'requirements' && item.itemType !== 'requirement') return false;
      if (filter === 'controls' && item.itemType !== 'control') return false;
      
      // Search
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        return item.code.toLowerCase().includes(lower) || item.title.toLowerCase().includes(lower);
      }
      return true;
    });
  }, [items, filter, searchTerm]);

  // Group by type for visual separation if 'all' is selected
  const requirements = filteredItems.filter(i => i.itemType === 'requirement');
  const controls = filteredItems.filter(i => i.itemType === 'control');

  // Stats
  const total = items.length;
  const completed = items.filter(i => i.status === 'COMPLETED').length;
  const progressPct = total === 0 ? 0 : Math.round((completed / total) * 100);
  
  const resultCounts = items.reduce((acc, item) => {
    acc[item.result] = (acc[item.result] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleExpand = (item: AuditChecklistItem) => {
    if (expandedItemId === item.id) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(item.id);
      setEditResult(item.result);
      setEditNotes(item.auditorNotes || '');
      setSaveError(null);
      setSaveSuccess(false);
    }
  };

  const handleSave = async (item: AuditChecklistItem) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      let newStatus: AuditChecklistItem['status'] = item.status;
      if (editResult !== 'NOT_EVALUATED') {
        newStatus = 'COMPLETED';
      } else if (editNotes.trim() !== '') {
        newStatus = 'IN_PROGRESS';
      } else {
        newStatus = 'NOT_STARTED';
      }

      await updateAuditChecklistItem(item.id, {
        result: editResult,
        status: newStatus,
        auditorNotes: editNotes
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
    } catch (err: any) {
      setSaveError('No fue posible guardar la evaluación. ' + (err.message || ''));
    } finally {
      setIsSaving(false);
    }
  };

  if (!session) return null;

  const renderItemRow = (item: AuditChecklistItem) => {
    const isExpanded = expandedItemId === item.id;
    const itemFindings = (data?.nonConformities || []).filter(
      nc => nc.auditItemId === item.id && nc.organizationId === currentOrgId && nc.auditId === session?.id
    );
    const itemEvidenceCount = (data?.evidenceLinks || []).filter(
      l => l.targetId === item.id && l.targetType === 'auditItem'
    ).length;
    
    return (
      <div key={item.id} className="border border-[var(--border)] rounded bg-white overflow-hidden mb-3">
        {/* Header Row */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => handleExpand(item)}
        >
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                item.itemType === 'requirement' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}>
                {item.itemType === 'requirement' ? 'Requisito' : 'Control'}
              </span>
              <span className="font-bold text-[var(--text-primary)]">{item.code}</span>
              {item.status === 'COMPLETED' && (
                <StatusBadge status="success" dot>Evaluado</StatusBadge>
              )}
            </div>
            <p className="text-sm text-[var(--text-secondary)] truncate">{item.title}</p>
            {itemEvidenceCount > 0 && (
              <p className="text-xs text-[var(--text-muted)] mt-1 inline-block mr-3">
                Evidencias: {itemEvidenceCount}
              </p>
            )}
            {itemFindings.length > 0 && (
              <p className="text-xs text-rose-500 mt-1 inline-block font-medium">
                Hallazgos: {itemFindings.length}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0">
            {item.result !== 'NOT_EVALUATED' && (
              <StatusBadge 
                status={
                  item.result === 'CONFORMING' ? 'success' :
                  item.result === 'NONCONFORMING' ? 'danger' :
                  item.result === 'OBSERVATION' ? 'warning' :
                  item.result === 'OPPORTUNITY_FOR_IMPROVEMENT' ? 'info' :
                  'neutral'
                }
              >
                {item.result === 'CONFORMING' ? 'Conforme' :
                 item.result === 'NONCONFORMING' ? 'No Conforme' :
                 item.result === 'OBSERVATION' ? 'Observación' :
                 item.result === 'OPPORTUNITY_FOR_IMPROVEMENT' ? 'Oportunidad de Mejora' :
                 'No Aplica'}
              </StatusBadge>
            )}
            <div className="text-[var(--text-muted)]">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>

        {/* Expanded Editor */}
        {isExpanded && (
          <div className="border-t border-[var(--border)] bg-slate-50/50 p-4 sm:p-6 space-y-6">
            <FormSection title="Evaluación" description="Registre el resultado y notas del auditor.">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Resultado de auditoría</label>
                  <select
                    value={editResult}
                    onChange={(e) => setEditResult(e.target.value as AuditChecklistItem['result'])}
                    disabled={isReadOnly}
                    className="w-full md:w-1/2 p-2 bg-white border border-[var(--border)] rounded text-sm focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none disabled:opacity-50 disabled:bg-slate-50"
                  >
                    <option value="NOT_EVALUATED">-- Sin evaluar --</option>
                    <option value="CONFORMING">Conforme</option>
                    <option value="NONCONFORMING">No Conforme</option>
                    <option value="OBSERVATION">Observación</option>
                    <option value="OPPORTUNITY_FOR_IMPROVEMENT">Oportunidad de Mejora</option>
                    <option value="NOT_APPLICABLE">No Aplica</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Notas del auditor</label>
                  <textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    disabled={isReadOnly}
                    rows={4}
                    placeholder="Documente la evidencia revisada, hallazgos, observaciones..."
                    className="w-full p-3 bg-white border border-[var(--border)] rounded text-sm focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none disabled:opacity-50 disabled:bg-slate-50 resize-y"
                  />
                </div>
              </div>
            </FormSection>
            
            <FormSection title="Evidencias Revisadas" description="Vincule evidencias pertinentes.">
              <EvidenceLinksSection 
                targetType="auditItem" 
                targetId={item.id} 
                isReadOnly={isReadOnly} 
              />
            </FormSection>

            {itemFindings.length > 0 && (
              <FormSection title="Hallazgos Registrados" description="Historial de hallazgos para este criterio.">
                <div className="space-y-2">
                  {itemFindings.map(nc => (
                    <div key={nc.id} className="flex justify-between items-start p-3 bg-rose-50 border border-rose-100 rounded">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{nc.title}</p>
                        <p className="text-xs text-rose-700 mt-1 uppercase tracking-wider font-semibold">
                          {nc.findingType === 'NONCONFORMITY' ? 'No Conformidad' : nc.findingType === 'OBSERVATION' ? 'Observación' : nc.findingType === 'OPPORTUNITY_FOR_IMPROVEMENT' ? 'Oportunidad de Mejora' : nc.findingType} • {nc.severity}
                        </p>
                      </div>
                      <StatusBadge status={nc.status === 'Abierta' ? 'warning' : nc.status === 'Cerrada' ? 'success' : 'info'}>
                        {nc.status}
                      </StatusBadge>
                    </div>
                  ))}
                </div>
              </FormSection>
            )}

            {!isReadOnly && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
                <div className="flex-1">
                  {saveError && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {saveError}
                    </p>
                  )}
                  {saveSuccess && (
                    <p className="text-sm text-emerald-600 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Evaluación guardada
                    </p>
                  )}
                </div>
                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setExpandedItemId(null)}
                    className="flex-1 sm:flex-none px-4 py-2 border border-[var(--border)] text-[var(--text-secondary)] rounded text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => handleSave(item)}
                    disabled={isSaving}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[var(--brand-navy)] text-white rounded text-sm font-medium hover:bg-[var(--brand-navy)]/90 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Guardar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <div className="bg-white border-b border-[var(--border)] px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{session.title}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{session.standard} • {session.type}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-slate-50 rounded transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-6 max-w-[1920px] mx-auto w-full">
        
        {isProgramada && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded p-4 flex items-start space-x-3 text-blue-800">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Auditoría Pendiente de inicio</h4>
              <p className="text-sm mt-1">
                La auditoría se encuentra en estado "Programada". Tiene {total} criterios planificados en su alcance.
                Cambie el estado a "En Progreso" para comenzar a registrar resultados.
              </p>
            </div>
          </div>
        )}

        {isReadOnly && !isProgramada && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded p-4 flex items-start space-x-3 text-amber-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              La auditoría está en estado <strong>{session.status}</strong>. El checklist de ejecución es de solo lectura.
            </p>
          </div>
        )}

        {total === 0 ? (
          <div className="bg-white border border-[var(--border)] rounded p-12 text-center">
            <AlertCircle className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--text-primary)]">Esta auditoría no tiene criterios de alcance definidos.</h3>
            <p className="text-[var(--text-secondary)] mt-2">Debe definir el alcance normativo antes de ejecutar la auditoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Sidebar Stats & Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-[var(--border)] rounded p-5 shadow-sm">
                <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-4">Progreso de Auditoría</h3>
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span className="text-[var(--text-secondary)]">Evaluados</span>
                  <span className="text-[var(--text-primary)]">{completed} / {total}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div 
                    className="bg-[var(--brand-accent)] h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[var(--text-muted)] text-right">{progressPct}% completado</p>
              </div>

              <div className="bg-white border border-[var(--border)] rounded p-5 shadow-sm">
                <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-4">Resumen de Resultados</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-[var(--text-secondary)]"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>Conformes</span>
                    <span className="font-medium">{resultCounts['CONFORMING'] || 0}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-[var(--text-secondary)]"><span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></span>No Conformes</span>
                    <span className="font-medium">{resultCounts['NONCONFORMING'] || 0}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-[var(--text-secondary)]"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2"></span>Observaciones</span>
                    <span className="font-medium">{resultCounts['OBSERVATION'] || 0}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-[var(--text-secondary)]"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></span>Op. de Mejora</span>
                    <span className="font-medium">{resultCounts['OPPORTUNITY_FOR_IMPROVEMENT'] || 0}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-[var(--text-secondary)]"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 mr-2"></span>No Aplica</span>
                    <span className="font-medium">{resultCounts['NOT_APPLICABLE'] || 0}</span>
                  </li>
                  <li className="flex justify-between items-center pt-3 mt-3 border-t border-[var(--border)]">
                    <span className="text-[var(--text-secondary)]">Sin evaluar</span>
                    <span className="font-medium text-[var(--text-muted)]">{resultCounts['NOT_EVALUATED'] || 0}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-[var(--border)] rounded p-5 shadow-sm">
                <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-3">Detalles</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Auditor Líder</dt>
                    <dd className="font-medium text-[var(--text-primary)]">{session.leadAuditor}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Fecha</dt>
                    <dd className="font-medium text-[var(--text-primary)]">{format(new Date(session.plannedDate), 'MMM d, yyyy')}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Main Checklist Area */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Toolbar */}
              <div className="bg-white p-3 rounded border border-[var(--border)] shadow-sm flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar por código o título..."
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="border border-[var(--border)] rounded text-sm px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                >
                  <option value="all">Todos los criterios</option>
                  <option value="pending">Pendientes</option>
                  <option value="in_progress">En progreso</option>
                  <option value="completed">Evaluados</option>
                  <option value="requirements">Solo Requisitos</option>
                  <option value="controls">Solo Controles</option>
                </select>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                {(filter === 'all' || filter === 'requirements') && requirements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">Requisitos del SGIA</h3>
                    {requirements.map(renderItemRow)}
                  </div>
                )}
                
                {(filter === 'all' || filter === 'controls') && controls.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 mt-6 uppercase tracking-wider">Controles del Anexo A</h3>
                    {controls.map(renderItemRow)}
                  </div>
                )}

                {filteredItems.length === 0 && (
                  <div className="bg-white border border-[var(--border)] rounded p-8 text-center text-[var(--text-secondary)] text-sm">
                    No se encontraron criterios que coincidan con la búsqueda o filtros aplicados.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>

      {findingFormItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[var(--border)] sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Registrar Hallazgo</h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">Criterio: {findingFormItem.code}</p>
              </div>
              <button onClick={() => setFindingFormItem(null)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <NonConformityForm
                onSuccess={() => setFindingFormItem(null)}
                onCancel={() => setFindingFormItem(null)}
                defaultSource="Auditoría"
                sourceType="audit"
                sourceId={findingFormItem.id}
                auditId={session?.id}
                auditItemId={findingFormItem.id}
                controlId={findingFormItem.itemType === 'control' ? findingFormItem.normativeId : undefined}
                requirementId={findingFormItem.itemType === 'requirement' ? findingFormItem.normativeId : undefined}
                defaultTitle={`Hallazgo en ${findingFormItem.code}`}
                defaultDescription={findingFormItem.auditorNotes || ''}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
