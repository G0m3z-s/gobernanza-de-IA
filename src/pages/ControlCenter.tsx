import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import { ControlHeader } from '../components/controls/ControlHeader';
import { SoaTab } from '../components/controls/SoaTab';
import { MaturityTab } from '../components/controls/MaturityTab';
import { ShieldCheck, BarChart3 } from 'lucide-react';

type Tab = 'soa' | 'maturity';

export function ControlCenter() {
  const { data, fetchData, loading, selectedStandard, setSelectedStandard , clearData} = useStore();
  const { currentOrgId } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('soa');
  
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
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-[1920px] mx-auto w-full pb-12 flex flex-col h-full">
      <ControlHeader data={data} filters={filters} setFilters={setFilters} />

      <div className="border-b border-[var(--border)]">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('soa')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
              activeTab === 'soa'
                ? 'border-[var(--brand-accent)] text-[var(--brand-accent)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Declaración de Aplicabilidad (SOA)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('maturity')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
              activeTab === 'maturity'
                ? 'border-[var(--brand-accent)] text-[var(--brand-accent)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Nivel de Madurez</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 mt-4">
        {activeTab === 'soa' && <SoaTab data={data} standard={filters.standard} />}
        {activeTab === 'maturity' && <MaturityTab data={data} standard={filters.standard} />}
      </div>
    </div>
  );
}
