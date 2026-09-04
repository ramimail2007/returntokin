'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronRight, Shield, AlertTriangle } from 'lucide-react';
import { Badge, Card } from '@/components/ui';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://returntokin-api.onrender.com';

export default function AdminPage() {
  const [stats, setStats] = useState<any>({});
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rtk_token');
    if (!token) return;
    Promise.all([
      fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${API}/api/admin/verification-queue`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([s, q]) => { setStats(s); setQueue(q.queue || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12"><div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-[14px]" />)}</div></div>;

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-12">
      <h1 className="text-[24px] md:text-[28px] font-bold text-navy mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Cases', value: stats.total_cases },
          { label: 'Pending Verification', value: stats.pending_verification, warn: true },
          { label: 'Sightings', value: stats.total_sightings },
          { label: 'Matches Pending', value: stats.pending_matches, warn: true },
          { label: 'Users', value: stats.total_users },
          { label: 'Active Partners', value: stats.total_organizations },
          { label: 'Abuse Reports', value: stats.abuse_reports, danger: true },
          { label: 'High Risk Cases', value: stats.high_risk_cases, danger: true },
        ].map((s) => (
          <Card key={s.label} className={`p-4 ${s.danger ? 'border-amber-200 bg-amber-50/30' : ''}`}>
            <div className="flex items-center gap-1.5">
              <div className="text-[22px] font-bold text-navy">{s.value ?? '—'}</div>
              {s.warn && (s.value ?? 0) > 0 && <AlertTriangle size={14} className="text-amber-500" />}
              {s.danger && (s.value ?? 0) > 0 && <AlertTriangle size={14} className="text-red-500" />}
            </div>
            <div className="text-xs text-text-muted mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Verification Queue */}
      <Card>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-navy">Verification Queue</h2>
          <span className="text-xs text-text-muted">{queue.length} pending</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-xs text-text-muted"><th className="p-3 font-medium">Case</th><th className="p-3 font-medium">Person</th><th className="p-3 font-medium">Reporter</th><th className="p-3 font-medium">Risk</th><th className="p-3 font-medium">Submitted</th><th className="p-3 font-medium"></th></tr></thead>
            <tbody>
              {queue.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-sm text-text-muted">No pending verification cases.</td></tr>
              ) : queue.map((c: any) => (
                <tr key={c.id} className="border-b border-border hover:bg-gray-50">
                  <td className="p-3 font-mono text-xs">{c.display_id}</td>
                  <td className="p-3 font-medium text-navy">{c.first_name} {c.family_name}</td>
                  <td className="p-3 text-text-secondary">{c.reporter_name || c.reporter_email || '—'}</td>
                  <td className="p-3"><Badge variant={c.risk_level === 'high' || c.risk_level === 'critical' ? 'warning' : 'neutral'}>{c.risk_level || 'unknown'}</Badge></td>
                  <td className="p-3 text-text-muted text-xs">{c.created_at ? new Date(c.created_at).toLocaleDateString() : '—'}</td>
                  <td className="p-3"><Link href={`/admin/verification/${c.id}`} className="text-teal font-semibold text-xs hover:underline">Review</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}