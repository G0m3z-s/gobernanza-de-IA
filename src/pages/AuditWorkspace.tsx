import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import { AuditHeader } from '../components/audit/AuditHeader';
import { AuditPlanTab } from '../components/audit/AuditPlanTab';
import { AuditExecutionTab } from '../components/audit/AuditExecutionTab';
import { FindingsTab } from '../components/audit/FindingsTab';

type Tab = 'plan' | 'execution' | 'findings';

export function AuditWorkspace() {
  const { data, fetchData, loading, selectedStandard, setSelectedStandard , clearData} = useStore();
  const { currentOrgId } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('plan');
  
  const [filters, setFilters] = useState({
    standard: selectedStandard || 'Integrado',
  });

  useEffect(() => {
    if (filters.standard !== selectedStandard) {
      setSelectedStandard(filters.standard);
    }
  }, [filters.standard, selectedStandard, setSelectedStandard]);

  useEffect(() => {
    if (selectedStandard && selectedStandard !== filters.standard) {
      setFilters(prev => ({ ...prev, standard: selectedStandard }));
    }
  }, [selectedStandard]);

  useEffect(() => {
    if (currentOrgId) {
      if (!data || data.organization?.id !== currentOrgId) {
        fetchData(currentOrgId);
      }
    } else {
      clearData();
    }
  }, [fetchData, currentOrgId, data, clearData]);

  if (loading || !data) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--brand-accent)] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto p-4 sm:p-6 lg:p-8 overflow-x-hidden flex flex-col h-full space-y-6">
      <AuditHeader data={data} filters={filters} setFilters={setFilters} />

      <div className="border-b border-[var(--border)]">
        <nav className="flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('plan')}
            className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'plan'
                ? 'border-[var(--brand-navy)] text-[var(--brand-navy)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]'
            }`}
          >
            Plan de Auditorías
          </button>
          
          <button
            onClick={() => setActiveTab('execution')}
            className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'execution'
                ? 'border-[var(--brand-navy)] text-[var(--brand-navy)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]'
            }`}
          >
            Ejecución
          </button>

          <button
            onClick={() => setActiveTab('findings')}
            className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'findings'
                ? 'border-[var(--brand-navy)] text-[var(--brand-navy)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]'
            }`}
          >
            Hallazgos
          </button>
        </nav>
      </div>

      <div className="flex-1 mt-4">
        {activeTab === 'plan' && <AuditPlanTab data={data} standard={filters.standard} />}
        {activeTab === 'execution' && <AuditExecutionTab data={data} standard={filters.standard} />}
        {activeTab === 'findings' && <FindingsTab data={data} standard={filters.standard} />}
      </div>
    </div>
  );
}
