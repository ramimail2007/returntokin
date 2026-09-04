'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Bell, ArrowRight, ChevronRight } from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rtk_token');
    if (!token) { window.location.href = '/login'; return; }
    fetch(`${API}/api/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12"><div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-[14px]" />)}</div></div>;

  const stats = data?.stats || { total_cases: 0, pending_verification: 0, unread_notifications: 0 };
  const recentCases = data?.recent_cases || [];
  const notifications = data?.notifications || [];

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-bold text-navy">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">Welcome back to ReturnToKin.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/report/missing"><Button variant="primary" size="sm"><Plus size={16} /> Report Missing</Button></Link>
          <Link href="/report/sighting"><Button variant="secondary" size="sm">Report Sighting</Button></Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5"><div className="text-[28px] font-bold text-navy">{stats.total_cases}</div><div className="text-xs text-text-muted mt-1">Active Cases</div></Card>
        <Card className="p-5"><div className="text-[28px] font-bold text-navy">{stats.pending_verification}</div><div className="text-xs text-text-muted mt-1">Pending Verification</div></Card>
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <div className="text-[28px] font-bold text-navy">{stats.unread_notifications}</div>
            {stats.unread_notifications > 0 && <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse-dot" />}
          </div>
          <div className="text-xs text-text-muted mt-1">Unread Notifications</div>
        </Card>
      </div>

      {/* Recent Cases */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy">My Cases</h2>
            <Link href="/my-cases" className="text-xs text-teal font-semibold hover:underline">View all</Link>
          </div>
          <div className="p-4">
            {recentCases.length === 0 ? (
              <div className="text-sm text-text-muted py-6 text-center">No cases yet. <Link href="/report/missing" className="text-teal font-semibold">Report someone missing</Link></div>
            ) : recentCases.map((c: any) => (
              <Link key={c.id} href={`/case/${c.display_id}`} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors">
                <div>
                  <div className="text-sm font-semibold text-navy">{c.first_name} {c.family_name}</div>
                  <div className="text-xs text-text-muted">{c.display_id} · <Badge variant={c.status === 'active' ? 'info' : 'warning'}>{c.status}</Badge></div>
                </div>
                <ChevronRight size={14} className="text-text-muted" />
              </Link>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy">Recent Activity</h2>
            <Bell size={14} className="text-text-muted" />
          </div>
          <div className="p-4">
            {notifications.length === 0 ? (
              <div className="text-sm text-text-muted py-6 text-center">No recent activity.</div>
            ) : notifications.slice(0, 5).map((n: any) => (
              <div key={n.id} className="py-3 border-b border-border last:border-0">
                <div className="text-sm font-medium text-navy">{n.title}</div>
                <div className="text-xs text-text-muted mt-0.5">{n.body}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}