import Link from 'next/link';
import { ChevronLeft, MapPin, Calendar, Share2, Shield, AlertTriangle } from 'lucide-react';
import { Badge, Button } from '@/components/ui';

// Pre-generate static paths for demo cases
export async function generateStaticParams() {
  const ids = [
    'RTK-26-A7F3', 'RTK-26-B8D2', 'RTK-26-C9E1', 'RTK-26-D0F4',
    'RTK-26-E1G5', 'RTK-26-F2H6', 'RTK-26-G3I7', 'RTK-26-H4J8',
  ];
  return ids.map((id) => ({ 'case-id': id }));
}

export default function CasePage({ params }: { params: { 'case-id': string } }) {
  const caseId = params['case-id'];
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-12">
      {/* Breadcrumb */}
      <Link href="/search" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-teal mb-6 transition-colors">
        <ChevronLeft size={14} /> Search / <span className="text-text-secondary font-medium">{caseId}</span>
      </Link>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: 3/5 */}
        <div className="lg:col-span-3 space-y-6">
          {/* Main Image */}
          <div className="aspect-[3/2] bg-gradient-to-br from-amber-100 to-amber-200 rounded-[18px] flex items-center justify-center">
            <span className="text-4xl font-bold text-navy/20">Photo</span>
          </div>

          {/* Status + Name */}
          <div>
            <Badge variant="missing">MISSING · VERIFIED</Badge>
            <h1 className="text-[28px] md:text-[32px] font-bold text-navy mt-2">Ahmed A.</h1>
            <div className="flex flex-wrap gap-4 text-sm text-text-secondary mt-2">
              <span>Case ID: {caseId}</span>
              <span>Age 27</span>
              <span>Jordanian</span>
              <span>Arabic, English</span>
            </div>
          </div>

          {/* Last Seen */}
          <div className="bg-teal-light/30 rounded-[14px] p-5 border border-teal/10">
            <h3 className="text-sm font-bold text-navy mb-2">Last Seen</h3>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin size={16} className="text-teal" />
              <span className="font-medium text-text-primary">Istanbul, Türkiye</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
              <Calendar size={16} className="text-teal" />
              <span>14 August 2026</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-navy mb-2">Physical Description</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Height: 175cm. Build: Medium. Hair: Dark brown, short. Eyes: Brown. 
              Last seen wearing a dark grey jacket and black trousers.
            </p>
          </div>

          {/* Public Timeline */}
          <div>
            <h3 className="text-sm font-bold text-navy mb-3">Case Timeline</h3>
            <div className="space-y-3">
              {[
                { date: '14 Aug 2026', event: 'Reported missing in Istanbul.', type: 'verified' },
                { date: '16 Aug 2026', event: 'Case verified and published.', type: 'verified' },
                { date: '20 Aug 2026', event: 'Public update — no new verified information.', type: 'info' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${item.type === 'verified' ? 'bg-teal' : 'bg-gray-300'}`} />
                    {i < 2 && <div className="w-px h-8 bg-border" />}
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">{item.date}</div>
                    <div className="text-sm text-text-secondary">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky Panel */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white border border-border rounded-[14px] p-5 shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-1">Have you seen Ahmed?</h3>
              <p className="text-sm text-text-secondary mb-4">Even a small detail may help.</p>
              <Link href="/report/sighting"><Button variant="primary" className="w-full">REPORT A SIGHTING</Button></Link>
              <button className="flex items-center justify-center gap-2 w-full mt-2 px-6 py-3 text-sm font-semibold bg-transparent text-teal border-2 border-teal rounded-[10px] hover:bg-teal-light transition-all">
                <Share2 size={16} /> SHARE THIS CASE
              </button>
            </div>

            <div className="bg-white border border-border rounded-[14px] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm text-text-primary"><Shield size={16} className="text-teal" /> Case verified</div>
              <div className="text-xs text-text-muted">Last updated: 20 Aug 2026</div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-[14px] p-5">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 leading-relaxed">
                  <strong>Safety notice:</strong> If you see this person, do not approach. Report the sighting and let professionals handle the situation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}