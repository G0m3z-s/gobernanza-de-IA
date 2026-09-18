import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';
import { FileText, Plus, X, Link as LinkIcon, Search } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Evidence, EvidenceLink } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';

export function EvidenceLinksSection({ 
  targetType, 
  targetId, 
  isReadOnly = false,
  hideTitle = false
}: { 
  targetType: 'control' | 'auditItem', 
  targetId: string, 
  isReadOnly?: boolean,
  hideTitle?: boolean
}) {
  const { currentOrgId, user } = useAuth();
  const { data, addEvidenceLink, removeEvidenceLink } = useStore();
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const allLinks = (data?.evidenceLinks || []) as EvidenceLink[];
  const myLinks = allLinks.filter(l => l.targetId === targetId && l.targetType === targetType);
  const myLinkedEvidenceIds = myLinks.map(l => l.evidenceId);

  useEffect(() => {
    async function fetchEvidences() {
      if (!currentOrgId || !showSelector) return;
      if (evidences.length > 0) return; // already fetched
      setLoading(true);
      try {
        const q = query(collection(db, 'evidences'), where('organizationId', '==', currentOrgId));
        const snap = await getDocs(q);
        setEvidences(snap.docs.map(d => ({ id: d.id, ...d.data() } as Evidence)));
      } catch (e) {
        console.error("Error fetching evidences:", e);
      }
      setLoading(false);
    }
    fetchEvidences();
  }, [currentOrgId, showSelector]);

  const handleLink = async (evidenceId: string) => {
    if (!currentOrgId || !user) return;
    
    // Front-end Referential Integrity check
    const ev = evidences.find(e => e.id === evidenceId);
    if (!ev) return;
    
    if (ev.organizationId !== currentOrgId) {
      console.error("Integridad Referencial Fallida: La evidencia no pertenece a la organización actual.");
      return;
    }

    const relationType = targetType === 'auditItem' ? 'reviewed' : 'supports';
    
    const link: EvidenceLink = {
      id: `${currentOrgId}_${evidenceId}_${targetType}_${targetId}`,
      organizationId: currentOrgId,
      evidenceId,
      targetType,
      targetId,
      relationType,
      createdAt: new Date().toISOString(),
      createdBy: user.uid
    };
    
    try {
      await addEvidenceLink(link);
      setShowSelector(false);
    } catch (e) {
      console.error("Error al crear EvidenceLink:", e);
    }
  };

  const handleUnlink = async (linkId: string) => {
    await removeEvidenceLink(linkId);
  };

  useEffect(() => {
    if (myLinks.length > 0 && evidences.length === 0 && currentOrgId) {
      const q = query(collection(db, 'evidences'), where('organizationId', '==', currentOrgId));
      getDocs(q).then(snap => setEvidences(snap.docs.map(d => ({ id: d.id, ...d.data() } as Evidence))));
    }
  }, [myLinks.length, currentOrgId]);

  return (
    <div className="space-y-3">
      {!hideTitle && (
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[var(--text-primary)] flex items-center">
            <LinkIcon className="w-4 h-4 mr-2 text-[var(--text-secondary)]" /> 
            Evidencias {targetType === 'auditItem' ? 'revisadas' : 'vinculadas'}
          </h4>
          {!isReadOnly && (
            <button
              type="button"
              onClick={() => setShowSelector(!showSelector)}
              className="text-xs font-medium text-[var(--brand-accent)] hover:text-[var(--brand-navy)] flex items-center"
            >
              <Plus className="w-3 h-3 mr-1" /> Vincular
            </button>
          )}
        </div>
      )}
      
      {hideTitle && !isReadOnly && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={() => setShowSelector(!showSelector)}
            className="text-xs font-medium text-[var(--brand-accent)] hover:bg-slate-50 px-2 py-1 rounded flex items-center transition-colors"
          >
            <Plus className="w-3 h-3 mr-1" /> Vincular evidencia
          </button>
        </div>
      )}

      {showSelector && !isReadOnly && (
        <div className="p-3 bg-slate-50 border border-[var(--border)] rounded">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase tracking-wider">Seleccionar evidencia</p>
            <button type="button" onClick={() => setShowSelector(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
            />
          </div>
          {loading ? (
            <p className="text-xs text-[var(--text-muted)] italic">Cargando...</p>
          ) : (
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {evidences
                .filter(e => !myLinkedEvidenceIds.includes(e.id))
                .filter(e => {
                  if (!searchTerm) return true;
                  const lower = searchTerm.toLowerCase();
                  return e.name.toLowerCase().includes(lower) || (e.description || '').toLowerCase().includes(lower);
                })
                .length === 0 ? (
                <p className="text-xs text-[var(--text-muted)] italic">No hay evidencias disponibles para vincular.</p>
              ) : (
                evidences
                  .filter(e => !myLinkedEvidenceIds.includes(e.id))
                  .filter(e => {
                    if (!searchTerm) return true;
                    const lower = searchTerm.toLowerCase();
                    return e.name.toLowerCase().includes(lower) || (e.description || '').toLowerCase().includes(lower);
                  })
                  .map(ev => (
                  <div key={ev.id} className="flex items-center justify-between p-2 bg-white border border-[var(--border)] rounded hover:border-[var(--brand-accent)] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-[var(--text-primary)]">{ev.name}</span>
                      <StatusBadge status={ev.status === 'Vencida' ? 'danger' : 'success'}>
                        {ev.status}
                      </StatusBadge>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLink(ev.id)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium rounded transition-colors"
                    >
                      Vincular
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {myLinks.length === 0 ? (
        <p className="text-xs text-[var(--text-muted)] italic">Sin evidencias vinculadas.</p>
      ) : (
        <div className="space-y-2">
          {myLinks.map(link => {
            const ev = evidences.find(e => e.id === link.evidenceId);
            return (
              <div key={link.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-[var(--border)] rounded group">
                <div className="flex items-start">
                  <FileText className="w-4 h-4 text-[var(--text-muted)] mt-0.5 mr-2" />
                  <div>
                    {ev ? (
                      <>
                        <p className="text-xs font-medium text-[var(--text-primary)] leading-tight mb-1">
                          {ev.name}
                        </p>
                        <StatusBadge status={ev.status === 'Vencida' ? 'danger' : 'success'}>
                          {ev.status}
                        </StatusBadge>
                      </>
                    ) : evidences.length > 0 ? (
                      <p className="text-xs font-medium text-[var(--text-muted)] italic leading-tight">
                        Evidencia no disponible
                      </p>
                    ) : (
                      <p className="text-xs font-medium text-[var(--text-muted)] leading-tight">
                        Cargando...
                      </p>
                    )}
                  </div>
                </div>
                {!isReadOnly && (
                  <button
                    type="button"
                    onClick={() => handleUnlink(link.id)}
                    className="text-[var(--text-muted)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Desvincular"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
