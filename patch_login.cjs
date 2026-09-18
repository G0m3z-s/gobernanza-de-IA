const fs = require('fs');
let content = fs.readFileSync('src/pages/Login.tsx', 'utf8');

// replace icon import
content = content.replace(
  /import \{ Cpu, ArrowRight \} from 'lucide-react';/,
  "import { ArrowRight, ShieldCheck } from 'lucide-react';\nimport { BrandMark } from '../components/brand/BrandMark';"
);

// replace rendering
content = content.replace(
  /  return \([\s\S]*?\);\n\}/,
  `  return (
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
}`
);

fs.writeFileSync('src/pages/Login.tsx', content);
console.log('patched Login.tsx');
