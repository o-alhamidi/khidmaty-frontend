'use client';

import { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = '' }: AuthCardProps) {
  return (
    <div
      className={`
        bg-card rounded-xl border border-border/50 shadow-lg shadow-black/5
        p-6 sm:p-8 backdrop-blur-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}
