import React, { useState } from 'react';
import { AISystem, DashboardData } from '../../types';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

const STAGES = [
  'IDEA', 'EVALUACIÓN', 'DISEÑO', 'DESARROLLO', 'VALIDACIÓN', 
  'APROBACIÓN', 'DESPLIEGUE', 'OPERACIÓN', 'MONITOREO', 
  'CAMBIO', 'SUSPENSIÓN', 'RETIRADA'
];

export function AILifecycle360Tab({ system, data }: { system: AISystem, data: DashboardData }) {
  const { updateAISystem, addAILifecycleEvent } = useStore();
  const { currentOrgId } = useAuth();
  
  const [newStage, setNewStage] = useState(system.lifecycleStage || 'EVALUACIÓN');
  const [comment, setComment] = useState('');
  const [responsible, setResponsible] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const events = (data.aiLifecycleEvents || [])
    .filter(e => e.aiSystemId === system.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  const impacts = (data.aiImpactAssessments || []).filter(i => i.aiSystemId === system.id);
  const hasImpact = impacts.length > 0;
  
  const currentStageFormatted = (() => {
      const sysStage = system.lifecycleStage || 'EVALUACIÓN';
      return sysStage.toUpperCase() === 'EVALUATION' ? 'EVALUACIÓN' :
             sysStage.toUpperCase() === 'DESIGN' ? 'DISEÑO' :
             sysStage.toUpperCase() === 'DEVELOPMENT' ? 'DESARROLLO' :
             sysStage.toUpperCase() === 'DEPLOYMENT' ? 'DESPLIEGUE' :
             sysStage.toUpperCase() === 'OPERATION' ? 'OPERACIÓN' :
             sysStage.toUpperCase() === 'MONITORING' ? 'MONITOREO' :
             sysStage.toUpperCase() === 'RETIREMENT' ? 'RETIRADA' :
             sysStage.toUpperCase() === 'DECOMMISSIONING' ? 'RETIRADA' :
             sysStage.toUpperCase() === 'APPROVAL' ? 'APROBACIÓN' :
             sysStage.toUpperCase() === 'CHANGE' ? 'CAMBIO' :
             sysStage.toUpperCase() === 'SUSPENSION' ? 'SUSPENSIÓN' :
             sysStage.toUpperCase();
  })();

  const isProduction = newStage === 'DESPLIEGUE' || newStage === 'OPERACIÓN' || newStage === 'PRODUCCIÓN';
  
  // Checklist verification
  const checklist = {
    ownerAssigned: !!system.ownerId,
    impactAssessmentDone: hasImpact,
    risksEvaluated: system.riskLevel !== undefined && system.riskLevel !== null,
    dataRegistered: system.personalData !== undefined,
    humanOversightDefined: !!system.humanOversightLevel,
    approvalRegistered: system.approvalStatus === 'approved'
  };
  
  const checklistFails = Object.values(checklist).filter(v => !v).length > 0;

  const handleStageChange = async () => {
    if (!currentOrgId || !newStage || !responsible || !comment) {
      setError('Debes completar la nueva etapa, responsable y comentario.');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      await updateAISystem(system.id, {
        lifecycleStage: newStage
      });
      
      await addAILifecycleEvent({
        organizationId: currentOrgId,
        aiSystemId: system.id,
        stage: newStage,
        previousStage: system.lifecycleStage || 'EVALUACIÓN',
        description: comment,
        responsibleId: responsible,
        date: new Date().toISOString(),
        eventType: 'STAGE_CHANGE'
      });
      
      setComment('');
      setResponsible('');
      
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Error al actualizar etapa.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
      {/* Timeline Section */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-slate-500" />
          Historial de Etapas
        </h3>
        
        {events.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-300 rounded-xl bg-slate-50">
            <p className="text-sm text-slate-500">No hay eventos de cambio de etapa registrados aún.</p>
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {events.map((ev, index) => (
              <div key={ev.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-500 line-through">{ev.previousStage || '---'}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">{ev.stage}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-2">{ev.description}</p>
                  <div className="flex justify-between items-center mt-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span className="font-medium text-slate-600">{ev.responsibleId}</span>
                    <span>{new Date(ev.date).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Control Section */}
      <div className="w-full md:w-96 shrink-0 bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Gestionar Ciclo de Vida</h3>
        
        <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold mb-1">ETAPA ACTUAL</p>
            <p className="text-lg font-black text-slate-800">{currentStageFormatted}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Transición a nueva etapa *</label>
            <select 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
              value={newStage}
              onChange={(e) => setNewStage(e.target.value)}
            >
              <option value="">Seleccionar etapa...</option>
              {STAGES.map(s => (
                <option key={s} value={s} disabled={s === currentStageFormatted}>{s}</option>
              ))}
            </select>
          </div>
          
          {isProduction && checklistFails && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 shrink-0" />
                <p className="text-sm font-bold text-amber-800">Checklist de Producción Incompleto</p>
              </div>
              <p className="text-xs text-amber-700 mb-3">Faltan requisitos antes de desplegar u operar:</p>
              <ul className="text-xs space-y-1">
                <li className="flex items-center"><CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 ${checklist.ownerAssigned ? 'text-emerald-500' : 'text-slate-300'}`} /> Propietario asignado</li>
                <li className="flex items-center"><CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 ${checklist.impactAssessmentDone ? 'text-emerald-500' : 'text-slate-300'}`} /> Impact Assessment (AIA)</li>
                <li className="flex items-center"><CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 ${checklist.risksEvaluated ? 'text-emerald-500' : 'text-slate-300'}`} /> Riesgos evaluados</li>
                <li className="flex items-center"><CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 ${checklist.dataRegistered ? 'text-emerald-500' : 'text-slate-300'}`} /> Datos registrados</li>
                <li className="flex items-center"><CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 ${checklist.humanOversightDefined ? 'text-emerald-500' : 'text-slate-300'}`} /> Supervisión humana definida</li>
                <li className="flex items-center"><CheckCircle2 className={`w-3.5 h-3.5 mr-1.5 ${checklist.approvalRegistered ? 'text-emerald-500' : 'text-slate-300'}`} /> Aprobación registrada</li>
              </ul>
              <p className="text-[10px] text-amber-600 mt-3 font-medium uppercase">* El sistema no bloquea la transición por ahora, pero se registrará la advertencia.</p>
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Responsable de la transición *</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white" 
              placeholder="Nombre o ID del responsable"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Comentario / Justificación *</label>
            <textarea 
              className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white h-24" 
              placeholder="Describa por qué el sistema avanza o retrocede de etapa..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Evidencia (Opcional)</label>
            <div className="w-full p-3 border border-dashed border-slate-300 rounded-lg bg-white text-center cursor-pointer hover:bg-slate-50 transition-colors">
              <span className="text-xs text-slate-500">Haz clic para adjuntar archivo</span>
            </div>
          </div>
          
          <button 
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors mt-2 disabled:opacity-50"
            onClick={handleStageChange}
            disabled={saving || !newStage || !responsible || !comment}
          >
            {saving ? 'REGISTRANDO...' : 'REGISTRAR CAMBIO DE ETAPA'}
          </button>
        </div>
      </div>
    </div>
  );
}
