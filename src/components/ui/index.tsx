// Reusable UI Components

import { type ReactNode, type ButtonHTMLAttributes } from 'react';

// ── Button ──────────────────────────────────────────────────────────
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-light active:bg-navy-dark',
    secondary: 'bg-transparent text-teal border-2 border-teal hover:bg-teal-light active:bg-teal/10',
    text: 'bg-transparent text-navy hover:text-teal hover:bg-gray-50',
    white: 'bg-white text-navy hover:bg-gray-50 active:bg-gray-100',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-[10px]',
    md: 'px-6 py-3 text-sm rounded-[10px]',
    lg: 'px-8 py-4 text-sm rounded-[12px]',
  };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}

// ── Badge ───────────────────────────────────────────────────────────
type BadgeVariant = 'missing' | 'success' | 'warning' | 'neutral' | 'info';

export function Badge({ variant = 'neutral', children }: { variant?: BadgeVariant; children: ReactNode }) {
  const styles: Record<BadgeVariant, string> = {
    missing: 'bg-amber-50 text-amber-700 border border-amber-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    neutral: 'bg-gray-50 text-gray-600 border border-gray-200',
    info: 'bg-teal-50 text-teal-700 border border-teal-200',
  };
  return <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full ${styles[variant]}`}>{children}</span>;
}

// ── Input ───────────────────────────────────────────────────────────
export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all ${className}`} {...props} />;
}

// ── Card ────────────────────────────────────────────────────────────
export function Card({ className = '', children, ...props }: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-surface border border-border rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] ${className}`} {...props}>{children}</div>;
}

// ── Section Heading ─────────────────────────────────────────────────
export function SectionHeading({ tag, title, align = 'left' }: { tag?: string; title: string; align?: 'left' | 'center' }) {
  return (
    <div className={`max-w-2xl mb-10 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {tag && <span className="text-teal text-sm font-semibold uppercase tracking-wider mb-2 block">{tag}</span>}
      <h2 className="text-[28px] md:text-[32px] font-bold text-navy leading-tight">{title}</h2>
    </div>
  );
}

// ── Status Dot ──────────────────────────────────────────────────────
export function StatusDot({ variant = 'neutral' }: { variant?: 'green' | 'amber' | 'teal' | 'neutral' }) {
  const colors = { green: 'bg-success', amber: 'bg-missing', teal: 'bg-teal', neutral: 'bg-gray-300' };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[variant]}`} />;
}

// ── Skeleton ────────────────────────────────────────────────────────
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-100 rounded-md ${className}`} />;
}

// ── Icon Wrapper ────────────────────────────────────────────────────
export function IconCircle({ children, variant = 'teal' }: { children: ReactNode; variant?: 'teal' | 'navy' | 'amber' }) {
  const bg = { teal: 'bg-teal-light text-teal', navy: 'bg-navy/10 text-navy', amber: 'bg-amber-50 text-amber-600' };
  return <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${bg[variant]}`}>{children}</span>;
}