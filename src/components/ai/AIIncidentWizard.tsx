import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { AIIncident } from '../../types';

export function AIIncidentWizard({ 
  onClose, 
  systemId 
}: { 
  onClose: () => void, 
  systemId?: string 
}) {
  const { addAIIncident, data } = useStore();
  const { currentOrgId } = useAuth();
  const aiSystems = data.aiSystems || [];
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Partial<AIIncident>>({
    aiSystemId: systemId || '',
    category: 'incorrect_output',
    severity: 'medium',
    description: '',
    date: new Date().toISOString().split('T')[0],
    reportedBy: '',
    affectedPeople: '',
    impact: '',
    responsible: '',
    containment: '',
    status: 'open'
  });

  const handleSave = async () => {
    if (!currentOrgId) return;
    
    if (!formData.aiSystemId || !formData.description) {
      setError('Sistema IA y Descripción son obligatorios.');
      return;
    }

    setSaving(true);
    setError('');
    
    try {
      const incidentData = {
        organizationId: currentOrgId,
        ...formData
      };

      await addAIIncident(incidentData);
      
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
          <h2 className="text-lg font-bold text-slate-800">Registrar Incidente IA</h2>
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
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Sistema IA Afectado *</label>
              <select 
                className="w-full border rounded-lg p-2 text-sm" 
                value={formData.aiSystemId} 
                onChange={e => setFormData({...formData, aiSystemId: e.target.value})}
                disabled={!!systemId}
              >
                <option value="">Seleccione Sistema...</option>
                {aiSystems.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Categoría</label>
              <select className="w-full border rounded-lg p-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="incorrect_output">Salida Incorrecta / Alucinación</option>
                <option value="bias">Sesgo Discriminatorio</option>
                <option value="privacy">Fuga de Privacidad / Datos</option>
                <option value="security">Incidente de Seguridad (Prompt Injection, etc.)</option>
                <option value="availability">Caída de Disponibilidad</option>
                <option value="misuse">Uso Indebido (Misuse)</option>
                <option value="provider">Falla del Proveedor Tercero</option>
                <option value="data">Corrupción de Datos</option>
                <option value="human_oversight">Fallo en Supervisión Humana</option>
                <option value="other">Otro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Severidad</label>
              <select className="w-full border rounded-lg p-2 text-sm" value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})}>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="critical">Crítica</option>
              </select>
            </div>
            
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Descripción del Incidente *</label>
              <textarea 
                className="w-full border rounded-lg p-2 text-sm h-24" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describa el comportamiento anómalo..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Fecha de Detección *</label>
              <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Reportado Por</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.reportedBy} onChange={e => setFormData({...formData, reportedBy: e.target.value})} />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Personas Afectadas (Usuarios/Sujetos)</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.affectedPeople} onChange={e => setFormData({...formData, affectedPeople: e.target.value})} placeholder="Ej. 500 usuarios, 1 departamento" />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Responsable de Gestión</label>
              <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.responsible} onChange={e => setFormData({...formData, responsible: e.target.value})} />
            </div>
            
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Impacto Material</label>
              <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.impact} onChange={e => setFormData({...formData, impact: e.target.value})} placeholder="Impacto financiero, reputacional o legal..."></textarea>
            </div>
            
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Medidas de Contención Inmediatas</label>
              <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.containment} onChange={e => setFormData({...formData, containment: e.target.value})} placeholder="Ej. Se apagó el modelo, se bloqueó IP..."></textarea>
            </div>
            
            <div className="col-span-2 mt-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Estado Inicial</label>
              <select className="w-full border rounded-lg p-2 text-sm bg-slate-50" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                <option value="open">Abierto (Reciente)</option>
                <option value="investigating">En Investigación</option>
                <option value="contained">Contenido (Mitigado)</option>
                <option value="corrective_action">Acción Correctiva (En ejecución)</option>
                <option value="closed">Cerrado</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={saving || !formData.aiSystemId || !formData.description}
          className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'GUARDANDO...' : 'REGISTRAR INCIDENTE'}
        </button>
      </div>
    </div>
  );
}
