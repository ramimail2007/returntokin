'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Search', href: '/search', hasDropdown: true },
  { label: 'How It Works', href: '/#how-it-works', hasDropdown: false },
  { label: 'For Organizations', href: '/organizations', hasDropdown: true },
  { label: 'Safety', href: '/safety', hasDropdown: false },
  { label: 'About', href: '/about', hasDropdown: false },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-[0_2px_4px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-[72px] md:h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="none" />
                <path d="M8 12h8M12 8v8" stroke="white" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-[16px] font-bold text-navy leading-tight">ReturnToKin</div>
              <div className="text-[10px] text-text-muted leading-tight">Every missing person deserves a way back.</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-navy rounded-lg hover:bg-gray-50 transition-colors"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} className="text-text-muted" />}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-navy rounded-lg hover:bg-gray-50 transition-colors">
              <Globe size={16} />
              <span>EN</span>
              <ChevronDown size={14} className="text-text-muted" />
            </button>
            <Link href="/login" className="text-sm font-semibold text-text-secondary hover:text-navy px-3 py-2 transition-colors">
              Log in
            </Link>
            <Link
              href="/report/missing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-navy text-white hover:bg-navy-light active:bg-navy-dark rounded-[10px] transition-all duration-200"
            >
              REPORT SOMEONE MISSING
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white absolute left-0 right-0 top-[72px] shadow-lg animate-fade-in">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="flex items-center justify-between px-3 py-3 text-sm font-medium text-text-secondary hover:text-navy rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} />}
              </Link>
            ))}
            <hr className="my-3 border-border" />
            <Link href="/report/missing" className="block px-3 py-3 text-sm font-semibold text-navy" onClick={() => setMobileOpen(false)}>Report Missing</Link>
            <Link href="/report/sighting" className="block px-3 py-3 text-sm font-semibold text-navy" onClick={() => setMobileOpen(false)}>Report a Sighting</Link>
            <Link href="/organizations" className="block px-3 py-3 text-sm font-semibold text-navy" onClick={() => setMobileOpen(false)}>Organizations</Link>
            <Link href="/safety" className="block px-3 py-3 text-sm font-semibold text-navy" onClick={() => setMobileOpen(false)}>Safety</Link>
            <hr className="my-3 border-border" />
            <Link href="/login" className="block px-3 py-3 text-sm font-semibold text-navy" onClick={() => setMobileOpen(false)}>Log in</Link>
            <div className="px-3 pt-2">
              <Link
                href="/report/missing"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold bg-navy text-white hover:bg-navy-light rounded-[10px] transition-all"
                onClick={() => setMobileOpen(false)}
              >
                REPORT SOMEONE MISSING
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}