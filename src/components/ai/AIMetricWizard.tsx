import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { AIMetric } from '../../types';

export function AIMetricWizard({ 
  onClose, 
  systemId 
}: { 
  onClose: () => void, 
  systemId: string 
}) {
  const { addAIMetric, addAlert, data } = useStore();
  const { currentOrgId } = useAuth();
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Partial<AIMetric>>({
    aiSystemId: systemId,
    name: '',
    type: 'accuracy',
    value: 0,
    unit: '%',
    threshold: 0,
    date: new Date().toISOString().split('T')[0],
    source: '',
    responsible: ''
  });

  const handleSave = async () => {
    if (!currentOrgId || !systemId) return;
    
    if (!formData.name || formData.value === undefined || formData.threshold === undefined) {
      setError('Nombre, Valor y Umbral son obligatorios.');
      return;
    }

    setSaving(true);
    setError('');
    
    try {
      const isBreached = (() => {
        const val = Number(formData.value);
        const thresh = Number(formData.threshold);
        // Simple heuristic: if accuracy/availability, breach is when value < threshold
        // if error/latency/bias/complaints, breach is when value > threshold
        if (formData.type === 'accuracy' || formData.type === 'availability') {
          return val < thresh;
        } else {
          return val > thresh;
        }
      })();

      const metricData = {
        organizationId: currentOrgId,
        ...formData,
        breached: isBreached
      };

      await addAIMetric(metricData);
      
      if (isBreached) {
        await addAlert({
          organizationId: currentOrgId,
          type: 'ALTO',
          message: `Métrica ${formData.name} superó umbral (${formData.value}${formData.unit}).`, 
          date: new Date().toISOString()
        });
      }
      
      onClose();
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl flex flex-col h-full">
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-4 text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-slate-800">Registrar Métrica</h2>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        {error && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Nombre de la Métrica *</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ej. Precisión Semanal" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Tipo de Métrica</label>
              <select className="w-full border rounded-lg p-2 text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                <option value="accuracy">Accuracy (Precisión)</option>
                <option value="error_rate">Tasa de Error</option>
                <option value="hallucination_rate">Tasa de Alucinación</option>
                <option value="bias_metric">Métrica de Sesgo</option>
                <option value="latency">Latencia</option>
                <option value="availability">Disponibilidad</option>
                <option value="human_override_rate">Tasa de Intervención Humana</option>
                <option value="complaints">Quejas de Usuarios</option>
                <option value="custom">Otra (Personalizada)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Valor *</label>
              <input type="number" step="any" className="w-full border rounded-lg p-2 text-sm" value={formData.value} onChange={e => setFormData({...formData, value: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Unidad</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} placeholder="%, ms, pts, etc." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Umbral de Alarma *</label>
              <input type="number" step="any" className="w-full border rounded-lg p-2 text-sm" value={formData.threshold} onChange={e => setFormData({...formData, threshold: parseFloat(e.target.value)})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Fecha *</label>
              <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Fuente / Herramienta</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} placeholder="Ej. Grafana, Datadog, LangSmith" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Responsable</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.responsible} onChange={e => setFormData({...formData, responsible: e.target.value})} />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
            <p className="font-bold text-slate-800 mb-1">Lógica de Alertas</p>
            <p>Si la métrica es de Accuracy o Disponibilidad, se alertará si el Valor <strong>es menor</strong> al Umbral. Para las demás (Latencia, Errores, etc.), se alertará si el Valor <strong>es mayor</strong> al Umbral.</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={saving || !formData.name || formData.value === undefined}
          className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'GUARDANDO...' : 'GUARDAR MÉTRICA'}
        </button>
      </div>
    </div>
  );
}
