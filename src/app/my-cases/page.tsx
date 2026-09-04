'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge, Card } from '@/components/ui';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function MyCasesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rtk_token');
    if (!token) { window.location.href = '/login'; return; }
    fetch(`${API}/api/cases`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setCases(d.cases || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12"><div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-[14px]" />)}</div></div>;

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-12">
      <h1 className="text-[24px] font-bold text-navy mb-6">My Cases</h1>
      {cases.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-sm text-text-muted mb-4">No cases yet.</p>
          <Link href="/report/missing" className="text-teal font-semibold text-sm hover:underline">Report someone missing</Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {cases.map((c: any) => (
            <Link key={c.id} href={`/case/${c.display_id || c.id}`} className="block bg-white border border-border rounded-[14px] p-4 hover:border-teal/30 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-navy">{c.first_name} {c.family_name}</span>
                    <Badge variant={c.status === 'active' ? 'info' : c.status === 'pending_verification' ? 'warning' : 'neutral'}>{c.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    <span className="font-mono">{c.display_id}</span>
                    {c.last_seen_city && <span className="flex items-center gap-1"><MapPin size={10} />{c.last_seen_city}, {c.last_seen_country}</span>}
                    {c.last_seen_date && <span className="flex items-center gap-1"><Calendar size={10} />{c.last_seen_date}</span>}
                  </div>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}