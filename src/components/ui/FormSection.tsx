import React from 'react';

interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="pb-3 border-b border-[var(--border)]">
          {title && <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>}
          {description && <p className="text-xs text-[var(--text-secondary)] mt-1">{description}</p>}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
