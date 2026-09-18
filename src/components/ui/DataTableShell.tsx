import React from 'react';

interface DataTableShellProps {
  title: string;
  icon?: React.ElementType;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

export function DataTableShell({ title, icon: Icon, headerActions, children }: DataTableShellProps) {
  return (
    <div className="bg-white rounded border border-[var(--border)] shadow-sm overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="font-semibold text-[var(--text-primary)] text-sm flex items-center uppercase tracking-wider">
          {Icon && <Icon className="w-4 h-4 mr-2 text-[var(--text-secondary)]" />}
          {title}
        </h2>
        {headerActions && (
          <div className="flex items-center gap-2">
            {headerActions}
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          {children}
        </div>
      </div>
    </div>
  );
}
