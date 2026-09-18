import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { AuditSession, AuditChecklistItem } from '../../types';
import { getISO42001AdaptedCatalog, getISO42001AdaptedControls } from '../../data/normativeCatalogAdapter';
import { SlideOver } from '../ui/SlideOver';
import { Search, CheckCircle2, Circle, AlertCircle, Save } from 'lucide-react';
import { buildAuditChecklistItemId, buildAuditItemsFromNormativeSelection } from '../../utils/auditHelpers';
import { StatusBadge } from '../ui/StatusBadge';

interface AuditScopePlannerProps {
  isOpen: boolean;
  onClose: () => void;
  session: AuditSession | null;
}

export function AuditScopePlanner({ isOpen, onClose, session }: AuditScopePlannerProps) {
  const { currentOrgId, user } = useAuth();
  const { data, addAuditChecklistItem, deleteAuditChecklistItem } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'selected' | 'unselected'>('all');
  const [selectedReqs, setSelectedReqs] = useState<Set<string>>(new Set());
  const [selectedCtrls, setSelectedCtrls] = useState<Set<string>>(new Set());
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load normative data
  const requirements = useMemo(() => getISO42001AdaptedCatalog(), []);
  const controls = useMemo(() => getISO42001AdaptedControls(), []);
  
  // Existing checklist items for this session
  const existingItems = useMemo(() => {
    if (!session || !data?.auditChecklistItems) return [];
    return data.auditChecklistItems.filter(item => item.auditId === session.id);
  }, [session, data?.auditChecklistItems]);

  const isReadOnly = session?.status !== 'Programada';

  // Initialize selection from existing items
  useEffect(() => {
    if (isOpen && session) {
      const initialReqs = new Set<string>();
      const initialCtrls = new Set<string>();
      
      existingItems.forEach(item => {
        if (item.itemType === 'requirement') {
          initialReqs.add(item.normativeId);
        } else if (item.itemType === 'control') {
          initialCtrls.add(item.normativeId);
        }
      });
      
      setSelectedReqs(initialReqs);
      setSelectedCtrls(initialCtrls);
      setError(null);
      setSuccessMsg(null);
      setSearchTerm('');
      setFilter('all');
    }
  }, [isOpen, session, existingItems]);

  const toggleReq = (id: string) => {
    if (isReadOnly) return;
    const next = new Set(selectedReqs);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedReqs(next);
  };

  const toggleCtrl = (id: string) => {
    if (isReadOnly) return;
    const next = new Set(selectedCtrls);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedCtrls(next);
  };

  const selectAllReqs = () => {
    if (isReadOnly) return;
    if (selectedReqs.size === requirements.length) {
      setSelectedReqs(new Set());
    } else {
      setSelectedReqs(new Set(requirements.map(r => r.id)));
    }
  };

  const selectAllCtrls = () => {
    if (isReadOnly) return;
    if (selectedCtrls.size === controls.length) {
      setSelectedCtrls(new Set());
    } else {
      setSelectedCtrls(new Set(controls.map(c => c.id)));
    }
  };

  const handleSave = async () => {
    if (!session || !currentOrgId || !user) return;
    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      // Find new selections
      const currentReqArr = Array.from(selectedReqs) as string[];
      const currentCtrlArr = Array.from(selectedCtrls) as string[];
      
      const newItemsToCreate = buildAuditItemsFromNormativeSelection(
        session.id,
        currentOrgId,
        user.uid,
        currentReqArr,
        currentCtrlArr
      );
      
      // Compute what to delete (in existingItems but not in new selection)
      const toDelete = existingItems.filter(item => {
        if (item.itemType === 'requirement') return !selectedReqs.has(item.normativeId);
        if (item.itemType === 'control') return !selectedCtrls.has(item.normativeId);
        return false;
      });

      // Filter out items to create that already exist (though our store handles this, it's faster to skip)
      const existingIds = new Set(existingItems.map(i => i.id));
      const toCreate = newItemsToCreate.filter(item => !existingIds.has(item.id!));

      // Delete removed items
      for (const item of toDelete) {
        await deleteAuditChecklistItem(item.id);
      }
      
      // Create new items
      for (const item of toCreate) {
        await addAuditChecklistItem(item);
      }
      
      setSuccessMsg(`Alcance actualizado: ${currentReqArr.length} requisitos y ${currentCtrlArr.length} controles.`);
      
      // Optionally close after a delay, or just let user see success msg
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
      
    } catch (err: any) {
      console.error(err);
      setError('No fue posible actualizar el alcance. ' + (err.message || ''));
    } finally {
      setIsSaving(false);
    }
  };

  // Filtering
  const filteredReqs = requirements.filter(r => {
    if (filter === 'selected' && !selectedReqs.has(r.id)) return false;
    if (filter === 'unselected' && selectedReqs.has(r.id)) return false;
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      return r.code.toLowerCase().includes(lower) || r.title.toLowerCase().includes(lower);
    }
    return true;
  });

  const filteredCtrls = controls.filter(c => {
    if (filter === 'selected' && !selectedCtrls.has(c.id)) return false;
    if (filter === 'unselected' && selectedCtrls.has(c.id)) return false;
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      return c.code.toLowerCase().includes(lower) || c.title.toLowerCase().includes(lower);
    }
    return true;
  });

  if (!session) return null;

  return (
    <SlideOver
      isOpen={isOpen}
      onClose={onClose}
      title="Definir alcance de auditoría"
      description="Selecciona los requisitos y controles que serán evaluados en esta sesión."
    >
      <div className="flex flex-col h-full space-y-6">
        
        {/* Info Header */}
        <div className="bg-slate-50 p-4 rounded border border-[var(--border)] text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Auditoría</span>
              <span className="block text-[var(--text-primary)] font-semibold">{session.title}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Estado</span>
              <StatusBadge 
                status={
                  session.status === 'Completada' ? 'success' :
                  session.status === 'En Progreso' ? 'warning' :
                  session.status === 'Cancelada' ? 'neutral' :
                  'info'
                }
              >
                {session.status}
              </StatusBadge>
            </div>
            {session.objective && (
              <div className="col-span-2">
                <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Objetivo</span>
                <span className="block text-[var(--text-primary)]">{session.objective}</span>
              </div>
            )}
            {session.scope && (
              <div className="col-span-2">
                <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Alcance descriptivo</span>
                <span className="block text-[var(--text-primary)]">{session.scope}</span>
              </div>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 bg-white sticky top-0 z-10 py-2 border-b border-[var(--border)]">
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
            <option value="all">Todos</option>
            <option value="selected">Seleccionados</option>
            <option value="unselected">No seleccionados</option>
          </select>
        </div>

        {isReadOnly && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 flex items-start space-x-3 text-blue-800 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              La auditoría está en estado <strong>{session.status}</strong>. El alcance es de solo lectura y no puede modificarse.
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-8 pb-20">
          
          {/* Requirements Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm">Requisitos del SGIA</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Seleccionados: {selectedReqs.size} / {requirements.length}
                </p>
              </div>
              {!isReadOnly && (
                <button
                  onClick={selectAllReqs}
                  className="text-[var(--brand-accent)] hover:text-[var(--brand-navy)] text-xs font-medium px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                >
                  {selectedReqs.size === requirements.length ? 'Desmarcar todos' : 'Seleccionar todos'}
                </button>
              )}
            </div>
            
            <div className="bg-white border border-[var(--border)] rounded divide-y divide-[var(--border)]">
              {filteredReqs.length === 0 ? (
                <div className="p-4 text-center text-sm text-[var(--text-muted)]">No hay requisitos que coincidan con la búsqueda.</div>
              ) : (
                filteredReqs.map(req => {
                  const isSelected = selectedReqs.has(req.id);
                  return (
                    <div 
                      key={req.id} 
                      className={`p-3 flex items-start space-x-3 transition-colors ${!isReadOnly ? 'cursor-pointer hover:bg-slate-50' : ''}`}
                      onClick={() => toggleReq(req.id)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-[var(--brand-navy)]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[var(--text-muted)]" />
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--text-primary)] text-sm block leading-tight">{req.code}</span>
                        <span className="text-[var(--text-secondary)] text-xs block mt-0.5">{req.title}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Controls Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm">Controles del Anexo A</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Seleccionados: {selectedCtrls.size} / {controls.length}
                </p>
              </div>
              {!isReadOnly && (
                <button
                  onClick={selectAllCtrls}
                  className="text-[var(--brand-accent)] hover:text-[var(--brand-navy)] text-xs font-medium px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                >
                  {selectedCtrls.size === controls.length ? 'Desmarcar todos' : 'Seleccionar todos'}
                </button>
              )}
            </div>
            
            <div className="bg-white border border-[var(--border)] rounded divide-y divide-[var(--border)]">
              {filteredCtrls.length === 0 ? (
                <div className="p-4 text-center text-sm text-[var(--text-muted)]">No hay controles que coincidan con la búsqueda.</div>
              ) : (
                filteredCtrls.map(ctrl => {
                  const isSelected = selectedCtrls.has(ctrl.id);
                  return (
                    <div 
                      key={ctrl.id} 
                      className={`p-3 flex items-start space-x-3 transition-colors ${!isReadOnly ? 'cursor-pointer hover:bg-slate-50' : ''}`}
                      onClick={() => toggleCtrl(ctrl.id)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-[var(--brand-navy)]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[var(--text-muted)]" />
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--text-primary)] text-sm block leading-tight">{ctrl.code}</span>
                        <span className="text-[var(--text-secondary)] text-xs block mt-0.5">{ctrl.title}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        {!isReadOnly && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[var(--border)] flex flex-col gap-3">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            {successMsg && (
              <div className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                {successMsg}
              </div>
            )}
            <div className="flex justify-between items-center w-full">
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Total criterios: {selectedReqs.size + selectedCtrls.size}
              </span>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 text-[var(--text-secondary)] rounded text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-1.5 bg-[var(--brand-navy)] text-white rounded text-sm font-medium hover:bg-[var(--brand-navy)]/90 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Guardar alcance
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SlideOver>
  );
}
