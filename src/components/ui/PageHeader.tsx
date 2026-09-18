import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    icon?: React.ElementType;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    icon?: React.ElementType;
    onClick: () => void;
  };
}

export function PageHeader({ title, description, primaryAction, secondaryAction }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {description}
          </p>
        )}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="inline-flex items-center px-3 py-1.5 bg-white border border-[var(--border)] text-[var(--text-secondary)] text-xs font-medium rounded hover:bg-slate-50 transition-colors"
            >
              {secondaryAction.icon && <secondaryAction.icon className="w-3.5 h-3.5 mr-1.5" />}
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="inline-flex items-center px-3 py-1.5 bg-[var(--brand-navy)] text-white text-xs font-medium rounded hover:bg-[var(--brand-navy-hover)] transition-colors shadow-sm"
            >
              {primaryAction.icon && <primaryAction.icon className="w-3.5 h-3.5 mr-1.5" />}
              {primaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
