import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInAnonymously } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { auth } from '../lib/firebase';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandMark } from '../components/brand/BrandMark';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { mockLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Credenciales inválidas o usuario no registrado.');
      } else {
        setError(err.message);
      }
    }
  };

  const handleMockLogin = async () => {
    try {
      // Create a random demo user with Email/Password (since Anonymous auth might be disabled)
      const randomId = Math.random().toString(36).substring(2, 8);
      const demoEmail = `demo_${randomId}@empresa.com`;
      const demoPass = 'demo123456';
      
      const userCred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
      const uid = userCred.user.uid;
      
      await updateProfile(userCred.user, { displayName: 'Usuario Demo' });
      
      // Auto-provision demo tenant
      const orgId = 'org-demo-' + randomId;
      
      await setDoc(doc(db, 'organizations', orgId), {
        name: 'Empresa Demo (Autogenerada)',
        sector: 'Tecnología',
        status: 'active'
      });
      
      await setDoc(doc(db, 'memberships', `${uid}_${orgId}`), {
        userId: uid,
        organizationId: orgId,
        role: 'organization_admin',
        status: 'active'
      });
      
      navigate('/');
    } catch (err: any) {
      setError('Error creando entorno de prueba: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg)] flex flex-col md:flex-row font-sans">
      
      {/* Branding Panel */}
      <div className="md:w-[45%] bg-[var(--brand-navy)] flex flex-col justify-between p-10 md:p-16 text-white">
        <div>
          <div className="flex items-center space-x-3 mb-12">
            <BrandMark className="w-10 h-10 text-[var(--brand-accent)]" />
            <h1 className="text-2xl font-bold tracking-tight">
              AIGobernanza <span className="font-light text-[var(--brand-accent)]">360</span>
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
            Gobierno, Riesgo y Cumplimiento de IA
          </h2>
          <p className="text-slate-300 text-lg max-w-md">
            Plataforma empresarial para la gestión integral y trazabilidad normativa.
          </p>
        </div>
        
        <div className="space-y-4 mt-12 md:mt-0">
          <div className="flex items-center space-x-3 text-sm text-slate-300">
            <ShieldCheck className="w-5 h-5 text-[var(--brand-accent)]" />
            <span>Alineado con ISO/IEC 42001</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-slate-300">
            <ShieldCheck className="w-5 h-5 text-[var(--brand-accent)]" />
            <span>Alineado con ISO/IEC 27001</span>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24">
        <div className="w-full max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
            Acceso al Sistema
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-50 text-rose-700 p-3 rounded text-sm font-medium break-words border border-rose-200">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] sm:text-sm"
                placeholder="usuario@empresa.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 rounded text-sm font-medium text-white bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-navy)] transition-colors shadow-sm"
              >
                Ingresar
              </button>
            </div>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--app-bg)] text-[var(--text-muted)]">Opciones de prueba</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleMockLogin}
                className="w-full flex items-center justify-center py-2 px-4 border border-[var(--border)] rounded text-sm font-medium text-[var(--text-secondary)] bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
              >
                Acceder al entorno demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
