import React, { useState } from 'react';
import { isoImplementationPath } from '../../data/implementationPath';
import { CheckCircle2, Circle, ChevronRight, Download, Upload, Sparkles, FileText, Bot, Loader2, Check } from 'lucide-react';

export function RoadmapTab({ data, standard }: { data: any, standard: string }) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  
  // AI Simulation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);

  // Upload Simulation State
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const activePhase = isoImplementationPath[activePhaseIndex];
  const activeStep = activePhase.steps[activeStepIndex];

  const handleStepClick = (phaseIdx: number, stepIdx: number) => {
    setActivePhaseIndex(phaseIdx);
    setActiveStepIndex(stepIdx);
    setGeneratedDraft(null); // Reset draft view
    setUploadedFile(null); // Reset upload view
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setGeneratedDraft(null);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedDraft(`**Borrador Autogenerado por IA**\n\nRespuesta al requerimiento: ${activeStep.aiPrompt}\n\n[ESTE ES UN TEXTO DE EJEMPLO GENERADO POR EL ASISTENTE]\n\n1. Objetivo del documento...\n2. Alcance y directrices...\n3. Principios éticos...\n\n*Nota: Revisa y adapta este contenido a las necesidades específicas de la organización.*`);
    }, 2500);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedFile(`Documento_Final_${activeStep.id}.pdf`);
      // Auto-complete step when uploaded
      setCompletedSteps(prev => ({ ...prev, [activeStep.id]: true }));
    }, 1500);
  };

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const totalSteps = isoImplementationPath.reduce((acc, phase) => acc + phase.steps.length, 0);
  const completedCount = Object.keys(completedSteps).filter(k => completedSteps[k]).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[700px]">
      
      {/* Sidebar - Phases & Steps */}
      <div className="w-full md:w-80 bg-slate-50 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="font-bold text-slate-800">Ruta de Implementación</h2>
          <p className="text-xs text-slate-500 mt-1">Guía paso a paso ({standard})</p>
          
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1 font-medium text-slate-600">
              <span>Progreso Global</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {isoImplementationPath.map((phase, pIdx) => (
            <div key={phase.id} className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-2 mt-2">
                {phase.title}
              </h3>
              {phase.steps.map((step, sIdx) => {
                const isActive = pIdx === activePhaseIndex && sIdx === activeStepIndex;
                const isCompleted = completedSteps[step.id];
                
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(pIdx, sIdx)}
                    className={`w-full flex items-start p-2.5 rounded-lg text-left transition-colors ${
                      isActive 
                        ? 'bg-white shadow-sm border border-slate-200' 
                        : 'hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <div className="mt-0.5 mr-3 flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-teal-500" />
                      ) : (
                        <Circle className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-slate-300'}`} />
                      )}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${isActive ? 'text-teal-700' : 'text-slate-700'}`}>
                        {step.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-mono bg-slate-100 inline-block px-1 rounded">
                        {step.clause}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Step Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
              {activeStep.clause}
            </span>
            <button
              onClick={() => toggleStepCompletion(activeStep.id)}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                completedSteps[activeStep.id]
                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {completedSteps[activeStep.id] ? (
                <><Check className="w-4 h-4 mr-2" /> Completado</>
              ) : (
                <><Circle className="w-4 h-4 mr-2" /> Marcar como completado</>
              )}
            </button>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeStep.title}</h2>
          <p className="text-slate-600">{activeStep.description}</p>
        </div>

        {/* Workspace */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* Templates & Upload Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Download Template Card */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Formato Sugerido</h3>
                <p className="text-sm text-slate-500 mb-4">Descarga una plantilla pre-diseñada para cumplir con este requisito normativo.</p>
                <div className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100 mb-4">
                  <FileText className="w-4 h-4 text-slate-400 mr-2" />
                  <span className="text-sm font-medium text-slate-700 truncate">{activeStep.templateName}</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center py-2 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Descargar Plantilla
              </button>
            </div>

            {/* Upload Evidence Card */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Subir Evidencia Final</h3>
                <p className="text-sm text-slate-500 mb-4">Sube el documento diligenciado y aprobado para integrarlo a la bóveda de auditoría.</p>
                
                {uploadedFile ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100 mb-4">
                    <div className="flex items-center truncate">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium text-emerald-800 truncate">{uploadedFile}</span>
                    </div>
                    <button onClick={() => setUploadedFile(null)} className="text-xs text-rose-600 font-medium ml-2 hover:underline">
                      Quitar
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center mb-4 bg-slate-50 text-slate-500">
                    <span className="text-xs font-medium text-center">Arrastra tu archivo aquí o haz clic para explorar</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleUpload}
                disabled={isUploading || !!uploadedFile}
                className={`w-full flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  uploadedFile 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                {isUploading ? 'Subiendo...' : uploadedFile ? 'Evidencia Subida' : 'Subir Documento'}
              </button>
            </div>
          </div>

          {/* AI Generator Card */}
          <div className="border border-purple-200 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-purple-200/50 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white shadow-sm text-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Generador Asistido por IA</h3>
                  <p className="text-sm text-purple-700/80 font-medium">Crea un borrador personalizado al instante</p>
                </div>
              </div>
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="hidden sm:flex items-center justify-center py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-70"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Bot className="w-4 h-4 mr-2" />}
                {isGenerating ? 'Generando Borrador...' : 'Generar Borrador'}
              </button>
            </div>
            
            <div className="p-5">
              {!generatedDraft && !isGenerating ? (
                <div className="bg-white/60 rounded-lg p-4 border border-purple-100 text-sm text-slate-600">
                  <p className="mb-2"><strong>La IA utilizará el siguiente prompt de contexto:</strong></p>
                  <p className="italic text-slate-500 font-mono text-xs">"{activeStep.aiPrompt}"</p>
                  <button 
                    onClick={handleGenerateAI}
                    className="mt-4 sm:hidden w-full flex items-center justify-center py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium shadow-sm"
                  >
                    <Bot className="w-4 h-4 mr-2" /> Generar Borrador
                  </button>
                </div>
              ) : isGenerating ? (
                <div className="bg-white rounded-lg p-8 border border-purple-100 flex flex-col items-center justify-center text-center">
                  <Sparkles className="w-8 h-8 text-purple-500 animate-pulse mb-4" />
                  <h4 className="text-slate-800 font-semibold mb-1">Analizando requerimientos normativos...</h4>
                  <p className="text-sm text-slate-500">Redactando borrador adaptado a su contexto.</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                  <div className="bg-slate-50 p-2 flex justify-end border-b border-slate-100">
                    <button className="text-xs font-medium text-purple-600 hover:text-purple-800 flex items-center px-2">
                      <Download className="w-3 h-3 mr-1" /> Copiar Texto
                    </button>
                  </div>
                  <div className="p-4 whitespace-pre-wrap text-sm text-slate-700 font-serif leading-relaxed">
                    {generatedDraft}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
