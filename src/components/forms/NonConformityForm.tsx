import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';
import { NonConformity, NonConformityStatus } from '../../types';
import { EvidenceLinksSection } from './EvidenceLinksSection';
import { FormSection } from '../ui/FormSection';

interface NonConformityFormProps {
  auditId?: string;
  auditItemId?: string;
  requirementId?: string;
  onSuccess: () => void;
  onCancel: () => void;
  defaultSource?: 'Auditoría' | 'Incidente' | 'Revisión por la Dirección' | 'Otro';
  sourceType?: 'manual' | 'control_effectiveness_test' | 'other' | 'audit';
  sourceId?: string;
  controlId?: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

export function NonConformityForm({ 
  onSuccess, 
  onCancel, 
  defaultSource = 'Auditoría',
  sourceType = 'manual',
  sourceId,
  controlId,
  auditId,
  auditItemId,
  requirementId,
  defaultTitle = '',
  defaultDescription = ''
}: NonConformityFormProps) {
  const { addNonConformity, selectedStandard } = useStore();
  const { currentOrgId, user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: defaultTitle,
    description: defaultDescription,
    source: defaultSource,
    severity: 'Media' as NonConformity['severity'],
    standardIds: [selectedStandard],
    findingType: 'NONCONFORMITY' as any
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrgId || !user) return;

    setLoading(true);
    setError(null);

    try {
      const nc = {
        organizationId: currentOrgId,
        title: formData.title,
        description: formData.description,
        source: formData.source,
        severity: formData.severity,
        status: 'Abierta' as NonConformityStatus,
        findingType: formData.findingType,
        sourceType,
        sourceId,
        controlId,
        requirementId,
        auditId,
        auditItemId,
        identifiedDate: new Date().toISOString(),
        reportedBy: user.uid,
        createdBy: user.uid,
        standardIds: formData.standardIds,
        capaIds: []
      };

      await addNonConformity(nc);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al guardar la No Conformidad');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <FormSection title="Detalles del Hallazgo" description="Proporcione la información clave sobre la no conformidad u observación.">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
            Título de la No Conformidad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none"
            placeholder="Ej: Falla en el control de acceso biométrico"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
            Descripción Detallada <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            required
            rows={4}
            className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none"
            placeholder="Describe qué ocurrió, dónde y por qué se considera una desviación de la norma."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {auditItemId && (
          <div className="bg-slate-50 border border-[var(--border)] rounded p-4">
            <EvidenceLinksSection targetType="auditItem" targetId={auditItemId} isReadOnly={true} />
          </div>
        )}
      </FormSection>

      <FormSection title="Clasificación" description="Categorice el hallazgo para su correcto tratamiento.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="findingType" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Clasificación del Hallazgo
            </label>
            <select
              id="findingType"
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none bg-white"
              value={formData.findingType}
              onChange={(e) => setFormData({ ...formData, findingType: e.target.value as any })}
            >
              <option value="OBSERVATION">Observación (Oportunidad de Mejora)</option>
              <option value="CONTROL_DEFICIENCY">Debilidad de Control</option>
              <option value="NONCONFORMITY">No Conformidad</option>
            </select>
          </div>

          <div>
            <label htmlFor="source" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Origen
            </label>
            <select
              id="source"
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none bg-white"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
            >
              <option value="Auditoría">Auditoría</option>
              <option value="Incidente">Incidente de Seguridad</option>
              <option value="Revisión por la Dirección">Revisión por la Dirección</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Severidad
            </label>
            <select
              id="severity"
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none bg-white"
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>
        </div>
      </FormSection>

      {/* Buttons */}
      <div className="pt-6 border-t border-[var(--border)] flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-white border border-[var(--border)] rounded hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--brand-navy)] rounded hover:bg-[var(--brand-navy)]/90 focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
          ) : (
            'Registrar No Conformidad'
          )}
        </button>
      </div>
    </form>
  );
}
