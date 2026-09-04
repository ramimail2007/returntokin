'use client';
import { useState, useEffect } from 'react';
import { Badge, Card, Button } from '@/components/ui';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rtk_token');
    if (!token) return;
    fetch(`${API}/api/matches`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setMatches(d.matches || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-12">
      <h1 className="text-[24px] font-bold text-navy mb-6">Potential Matches</h1>
      {loading ? <div className="animate-pulse space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-[14px]" />)}</div> : (
        <div className="space-y-3">
          {matches.length === 0 ? <Card className="p-8 text-center text-sm text-text-muted">No matches to review.</Card> : matches.map((m: any) => (
            <Card key={m.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy">{m.first_name} {m.family_name}</span>
                    <Badge variant={m.status === 'pending_review' ? 'warning' : m.status === 'strong_match' ? 'success' : 'neutral'}>{m.status}</Badge>
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    Case: {m.display_id} · {m.location_city && `${m.location_city}, ${m.location_country}`} · {m.sighting_date && `Sighted: ${m.sighting_date}`}
                  </div>
                  {m.score != null && <div className="text-xs text-text-muted mt-1">Match Score: {Math.round(m.score * 100)}%</div>}
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="!text-emerald-600 !border-emerald-300"><CheckCircle size={14} /> Approve</Button>
                  <Button variant="secondary" size="sm" className="!text-red-500 !border-red-200"><XCircle size={14} /> Reject</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}