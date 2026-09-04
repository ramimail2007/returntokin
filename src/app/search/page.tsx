import Link from 'next/link';
import { Search, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { Badge, SectionHeading } from '@/components/ui';
import { demoCases } from '@/lib/constants';

export default function SearchPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <SectionHeading tag="Search" title="Search missing-person cases" />
      <p className="text-text-secondary text-sm -mt-6 mb-8">Search publicly available cases by name, location or case ID.</p>

      {/* Search Bar */}
      <div className="flex items-center bg-white border border-border rounded-[10px] shadow-sm overflow-hidden max-w-[640px] mb-8">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search size={18} className="text-text-muted shrink-0" />
          <input type="text" placeholder="Search by name, location or case ID" className="flex-1 py-4 text-sm bg-transparent outline-none placeholder:text-text-muted" />
        </div>
        <button className="bg-navy text-white px-6 py-4 text-sm font-semibold hover:bg-navy-light transition-colors">SEARCH</button>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-text-secondary">{demoCases.length} public cases found</span>
        <select className="text-sm border border-border rounded-[10px] px-3 py-2 bg-white">
          <option>Most recent</option>
          <option>Last seen date</option>
          <option>Relevance</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {demoCases.map((c) => {
          const initials = c.name.split(' ').map(n => n[0]).join('').slice(0, 2);
          const colors = ['from-amber-100 to-amber-200', 'from-blue-100 to-blue-200', 'from-emerald-100 to-emerald-200', 'from-purple-100 to-purple-200', 'from-rose-100 to-rose-200', 'from-cyan-100 to-cyan-200'];
          const gradient = colors[Math.abs(c.name.charCodeAt(0)) % colors.length];
          return (
            <div key={c.id} className="bg-white border border-border rounded-[14px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <span className="text-2xl font-bold text-navy/30">{initials}</span>
              </div>
              <div className="p-4">
                <Badge variant="missing">{c.status}</Badge>
                <h3 className="text-[15px] font-bold text-text-primary mt-2">{c.name}</h3>
                <div className="text-xs text-text-secondary space-y-1 mt-2">
                  <div><span>Age {c.age} · {c.nationality}</span></div>
                  <div className="flex items-center gap-1.5"><MapPin size={12} /><span>{c.lastSeen}</span></div>
                  <div className="flex items-center gap-1.5"><Calendar size={12} /><span>{c.date}</span></div>
                </div>
                <Link href={`/case/${c.id}`} className="flex items-center justify-between w-full mt-3 pt-3 border-t border-border text-sm font-semibold text-navy hover:text-teal transition-colors">
                  VIEW CASE <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}