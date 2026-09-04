import Link from 'next/link';
import { Globe, ExternalLink, Camera, Users, MessageCircle, Film } from 'lucide-react';

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Search Cases', href: '/search' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Safety', href: '/safety' },
    ],
  },
  {
    title: 'Report',
    links: [
      { label: 'Report Someone Missing', href: '/report/missing' },
      { label: 'Report a Sighting', href: '/report/sighting' },
      { label: 'I May Be Missing', href: '/find-me' },
    ],
  },
  {
    title: 'Organizations',
    links: [
      { label: 'For Organizations', href: '/organizations' },
      { label: 'Become a Partner', href: '/organizations/apply' },
      { label: 'API — Coming Soon', href: '#' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Mission', href: '/about#mission' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

const socialLinks = [
  { icon: MessageCircle, href: '#', label: 'Facebook' },
  { icon: ExternalLink, href: '#', label: 'X / Twitter' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Users, href: '#', label: 'LinkedIn' },
  { icon: Film, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-16">
        {/* Top: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="none" />
                  <path d="M8 12h8M12 8v8" stroke="white" />
                </svg>
              </div>
              <span className="text-[16px] font-bold leading-tight">ReturnToKin</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-[240px]">
              Every missing person deserves a way back.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <s.icon size={16} className="text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white/90 mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 hover:text-white/80 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-white/40">
            <a href="#" className="flex items-center gap-1.5 hover:text-white/60">
              <Globe size={14} />
              <span>EN</span>
            </a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white/60">AR</a>
          </div>
          <p className="text-xs text-white/30">
            © 2024 ReturnToKin. All rights reserved. Registered non-profit initiative (status: in progress).
          </p>
        </div>
      </div>
    </footer>
  );
}