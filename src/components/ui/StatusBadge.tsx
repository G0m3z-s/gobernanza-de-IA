import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type StatusType = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ status, children, className, dot = false }: StatusBadgeProps) {
  const baseClasses = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border";
  
  const statusClasses = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
    neutral: "bg-slate-50 text-slate-700 border-[var(--border)]",
  };

  const dotColors = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-sky-500",
    neutral: "bg-slate-500",
  };

  return (
    <span className={twMerge(baseClasses, statusClasses[status], className)}>
      {dot && (
        <span className={twMerge("w-1.5 h-1.5 rounded-full mr-1.5", dotColors[status])} />
      )}
      {children}
    </span>
  );
}
