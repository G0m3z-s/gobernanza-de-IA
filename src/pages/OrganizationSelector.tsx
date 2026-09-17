import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Building2, ChevronRight, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { Organization } from '../types';

export function OrganizationSelector() {
  const { user, memberships, setCurrentOrgId } = useAuth();
  const [orgs, setOrgs] = useState<{ id: string, name: string, role: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      if (!memberships || memberships.length === 0) {
        setLoading(false);
        return;
      }
      
      try {
        const orgsData = await Promise.all(memberships.map(async (m) => {
          const orgDoc = await getDoc(doc(db, 'organizations', m.organizationId));
          if (orgDoc.exists()) {
            return { id: m.organizationId, name: orgDoc.data().name, role: m.role };
          }
          return null;
        }));
        
        setOrgs(orgsData.filter(Boolean) as any);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrgs();
  }, [memberships]);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Building2 className="w-12 h-12 text-teal-600 mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">Selecciona tu Organización</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Tu usuario {user?.email} tiene acceso a múltiples organizaciones.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          {loading ? (
             <div className="flex justify-center p-4">
               <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
             </div>
          ) : orgs.length === 0 ? (
             <div className="text-center text-slate-500">
               <p className="mb-4">No tienes organizaciones asignadas.</p>
               <button onClick={handleLogout} className="text-teal-600 hover:underline">Cerrar Sesión</button>
             </div>
          ) : (
            <div className="space-y-4">
              {orgs.map(org => (
                <button
                  key={org.id}
                  onClick={() => setCurrentOrgId(org.id)}
                  className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-left"
                >
                  <div>
                    <h3 className="font-bold text-slate-800">{org.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 uppercase">Rol: {org.role}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              ))}
              
              <div className="pt-4 mt-6 border-t border-slate-200">
                <button 
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
