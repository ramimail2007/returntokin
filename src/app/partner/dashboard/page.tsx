'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Users, Eye, Activity, FileText, Settings, Bell, ChevronRight, Plus } from 'lucide-react';
import { Badge, Card, Button } from '@/components/ui';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://returntokin-api.onrender.com';

export default function PartnerDashboardPage() {
  const [stats, setStats] = useState<any>({});
  const [sightings, setSightings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rtk_token');
    if (!token) { window.location.href = '/login'; return; }
    Promise.all([
      fetch(`${API}/api/dashboard`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(() => ({})),
      fetch(`${API}/api/sightings`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(() => ({ sightings: [] })),
    ]).then(([d, s]) => { setStats(d.stats || {}); setSightings(s.sightings || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12"><div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-[14px]" />)}</div></div>;

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-navy">Partner Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">Case management and coordination workspace.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/organizations/apply"><Button variant="secondary" size="sm"><Shield size={14} /> Settings</Button></Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Activity, label: 'Active Cases', value: stats.total_cases || 0 },
          { icon: Eye, label: 'New Sightings', value: sightings.length },
          { icon: Users, label: 'Team Members', value: '—' },
          { icon: Bell, label: 'Alerts', value: stats.unread_notifications || 0 },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center gap-2"><s.icon size={16} className="text-teal" /><div className="text-[22px] font-bold text-navy">{s.value}</div></div>
            <div className="text-xs text-text-muted mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Recent Sightings */}
      <Card className="mb-8">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-navy">Recent Sightings</h2>
          <Link href="/admin/sightings" className="text-xs text-teal font-semibold hover:underline">View all</Link>
        </div>
        <div className="p-4">
          {sightings.length === 0 ? (
            <div className="text-sm text-text-muted text-center py-6">No sightings submitted yet.</div>
          ) : sightings.slice(0, 5).map((s: any) => (
            <div key={s.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <div className="text-sm font-medium text-navy">{s.location_city}, {s.location_country}</div>
                <div className="text-xs text-text-muted">{s.sighting_date || 'Date unknown'} · {s.first_name ? `Case: ${s.first_name} ${s.family_name}` : 'General sighting'}</div>
              </div>
              <Badge variant={s.reviewed ? 'success' : 'warning'}>{s.reviewed ? 'Reviewed' : 'New'}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/report/missing" className="block bg-white border border-border rounded-[14px] p-4 hover:border-teal/30 transition-all">
          <Plus size={20} className="text-teal mb-2" />
          <div className="text-sm font-semibold text-navy">New Case</div>
          <div className="text-xs text-text-muted">Create a missing-person case</div>
        </Link>
        <Link href="/admin/matches" className="block bg-white border border-border rounded-[14px] p-4 hover:border-teal/30 transition-all">
          <Activity size={20} className="text-teal mb-2" />
          <div className="text-sm font-semibold text-navy">Review Matches</div>
          <div className="text-xs text-text-muted">AI-suggested potential matches</div>
        </Link>
        <Link href="/ai-tools" className="block bg-white border border-border rounded-[14px] p-4 hover:border-teal/30 transition-all">
          <FileText size={20} className="text-teal mb-2" />
          <div className="text-sm font-semibold text-navy">AI Tools</div>
          <div className="text-xs text-text-muted">Face matching & age progression</div>
        </Link>
      </div>
    </div>
  );
}