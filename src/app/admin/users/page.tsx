'use client';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { Shield, UserCheck } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://returntokin-api.onrender.com';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rtk_token');
    if (!token) return;
    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(s => setUsers([])).catch(() => setLoading(false));
    setLoading(false);
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-12">
      <h1 className="text-[24px] font-bold text-navy mb-6">Users</h1>
      <Card className="p-8 text-center">
        <UserCheck size={32} className="mx-auto text-text-muted mb-3" />
        <p className="text-sm text-text-muted">User management interface coming in the next build cycle.</p>
      </Card>
    </div>
  );
}