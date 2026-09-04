'use client';
import { useState, useEffect } from 'react';
import { Badge, Card } from '@/components/ui';
import { MapPin, Calendar, Eye } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AdminSightingsPage() {
  const [sightings, setSightings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rtk_token');
    if (!token) return;
    fetch(`${API}/api/sightings`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setSightings(d.sightings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-12">
      <h1 className="text-[24px] font-bold text-navy mb-6">Sightings</h1>
      {loading ? <div className="animate-pulse space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-[14px]" />)}</div> : (
        <div className="space-y-3">
          {sightings.length === 0 ? <Card className="p-8 text-center text-sm text-text-muted">No sightings yet.</Card> : sightings.map((s: any) => (
            <Card key={s.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {s.first_name ? <span className="text-sm font-semibold text-navy">For {s.first_name} {s.family_name}</span> : <span className="text-sm font-semibold text-navy">General Sighting</span>}
                    <Badge variant={s.status === 'pending' ? 'warning' : 'success'}>{s.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><MapPin size={10} />{s.location_city}, {s.location_country}</span>
                    {s.sighting_date && <span className="flex items-center gap-1"><Calendar size={10} />{s.sighting_date}</span>}
                  </div>
                  {s.description && <p className="text-xs text-text-muted mt-2 line-clamp-2">{s.description}</p>}
                </div>
                <Badge variant={s.reviewed ? 'success' : 'warning'}>{s.reviewed ? 'Reviewed' : 'Pending'}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}