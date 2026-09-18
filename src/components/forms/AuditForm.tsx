import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';
import { FormSection } from '../ui/FormSection';

interface AuditFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AuditForm({ onSuccess, onCancel }: AuditFormProps) {
  const { addAuditSession, selectedStandard } = useStore();
  const { currentOrgId, user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    standard: selectedStandard !== 'Integrado' ? selectedStandard : 'ISO/IEC 42001',
    type: 'Interna',
    status: 'Programada',
    plannedDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    leadAuditor: user?.displayName || user?.email || 'Auditor',
    scope: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrgId) return;

    setLoading(true);
    setError(null);

    try {
      const auditData = {
        organizationId: currentOrgId,
        title: formData.title,
        standard: formData.standard,
        type: formData.type,
        status: formData.status,
        plannedDate: new Date(formData.plannedDate).toISOString(),
        leadAuditor: formData.leadAuditor,
        scope: formData.scope
      };

      await addAuditSession(auditData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al programar la auditoría');
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

      <FormSection title="Información General" description="Datos básicos de la sesión de auditoría.">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
            Título de la Auditoría <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none"
            placeholder="Ej: Auditoría Anual ISO 42001"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="standard" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Norma a Auditar
            </label>
            <select
              id="standard"
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none bg-white"
              value={formData.standard}
              onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
            >
              <option value="ISO/IEC 42001">ISO/IEC 42001 (IA)</option>
              <option value="ISO/IEC 27001">ISO/IEC 27001 (Seguridad)</option>
              <option value="ISO/IEC 27701">ISO/IEC 27701 (Privacidad)</option>
              <option value="ISO/IEC 9001">ISO 9001 (Calidad)</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Tipo de Auditoría
            </label>
            <select
              id="type"
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none bg-white"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Interna">Auditoría Interna</option>
              <option value="Externa">Auditoría Externa (Certificación)</option>
              <option value="Revisión por la Dirección">Revisión por la Dirección</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection title="Planificación" description="Detalles de fecha y responsables de la auditoría.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="plannedDate" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Fecha Programada <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="plannedDate"
              required
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none bg-white"
              value={formData.plannedDate}
              onChange={(e) => setFormData({ ...formData, plannedDate: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="leadAuditor" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Auditor Líder <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="leadAuditor"
              required
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none"
              value={formData.leadAuditor}
              onChange={(e) => setFormData({ ...formData, leadAuditor: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="scope" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
            Alcance de la Auditoría
          </label>
          <textarea
            id="scope"
            rows={3}
            className="w-full px-3 py-2 border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:outline-none"
            placeholder="Describe qué departamentos, procesos o sistemas serán auditados..."
            value={formData.scope}
            onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
          />
        </div>
      </FormSection>

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
          {loading ? 'Programando...' : 'Programar Auditoría'}
        </button>
      </div>
    </form>
  );
}
