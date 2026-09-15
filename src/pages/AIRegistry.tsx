import React from 'react';
export function AIRegistry() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">AI Registry</h1>
      <p className="text-slate-500 max-w-md">
        Este módulo se encuentra en evolución. Su arquitectura de datos ya está contemplada en el diseño del sistema.
      </p>
    </div>
  );
}
