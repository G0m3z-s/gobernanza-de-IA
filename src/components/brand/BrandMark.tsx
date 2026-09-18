import React from 'react';

export function BrandMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 13V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
