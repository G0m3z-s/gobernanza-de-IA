import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';
import { FormSection } from '../ui/FormSection';

interface RiskFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function RiskForm({ onSuccess, onCancel }: RiskFormProps) {
  const { addRisk, selectedStandard } = useStore();
  const { currentOrgId, user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Seguridad de la Información',
    level: 'Medio',
    status: 'Identificado',
    description: '',
    standardIds: [selectedStandard],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrgId || !user) return;

    setLoading(true);
    setError(null);

    try {
      const risk = {
        organizationId: currentOrgId,
        name: formData.name,
        description: formData.description,
        type: formData.type,
        level: formData.level,
        status: formData.status,
        identifiedDate: new Date().toISOString(),
        reportedBy: user?.displayName || user?.email || 'Sistema',
        standardIds: formData.standardIds,
      };

      await addRisk(risk);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al guardar el Riesgo');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded flex items-start space-x-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p className="text-xs">{error}</p>
        </div>
      )}

      <FormSection>
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-[var(--text-primary)] mb-1">
            Nombre del Riesgo <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] outline-none"
            placeholder="Ej: Fuga de datos confidenciales por uso de IA pública"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-medium text-[var(--text-primary)] mb-1">
            Descripción del Escenario (Opcional)
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] outline-none resize-none"
            placeholder="Describe la vulnerabilidad y la amenaza que podrían explotarla."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <p className="text-[11px] text-[var(--text-muted)] mt-1">
            Detalla el impacto potencial de este escenario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-xs font-medium text-[var(--text-primary)] mb-1">
              Categoría
            </label>
            <select
              id="type"
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] outline-none bg-white"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Seguridad de la Información">Seguridad de la Información</option>
              <option value="Sistemas de IA">Sistemas de IA</option>
              <option value="Privacidad de Datos">Privacidad de Datos</option>
              <option value="Técnico / Infraestructura">Técnico / Infraestructura</option>
              <option value="Reputacional">Reputacional</option>
              <option value="Legal y Cumplimiento">Legal y Cumplimiento</option>
            </select>
          </div>
          <div>
            <label htmlFor="level" className="block text-xs font-medium text-[var(--text-primary)] mb-1">
              Nivel (Inherente)
            </label>
            <select
              id="level"
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] outline-none bg-white"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            >
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
              <option value="Crítico">Crítico</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-xs font-medium text-[var(--text-primary)] mb-1">
            Estado Inicial de Tratamiento
          </label>
          <select
            id="status"
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] outline-none bg-white"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Identificado">Identificado (Sin Plan)</option>
            <option value="En Tratamiento">En Tratamiento</option>
            <option value="Aceptado">Aceptado (Riesgo Residual Permitido)</option>
          </select>
        </div>
      </FormSection>

      {/* Buttons */}
      <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-xs font-medium text-[var(--text-secondary)] bg-white border border-[var(--border)] rounded hover:bg-slate-50 transition-colors outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-[var(--brand-navy)] rounded hover:bg-[var(--brand-navy-hover)] transition-colors outline-none focus:ring-1 focus:ring-[var(--brand-navy)] disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
          ) : (
            'Registrar Riesgo'
          )}
        </button>
      </div>
    </form>
  );
}
