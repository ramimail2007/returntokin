import Link from 'next/link';
import { ArrowRight, Shield, Share2, Users, Globe, FileText } from 'lucide-react';
import { Button, SectionHeading, Card } from '@/components/ui';

export default function OrganizationsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <SectionHeading tag="For Organizations" title="Connect cases across organizations." />
          <p className="text-text-secondary text-sm leading-relaxed -mt-6 mb-6">
            ReturnToKin helps humanitarian organizations, shelters, hospitals and trusted institutions 
            manage cases, share information securely, and identify possible links across disconnected systems.
          </p>
          <Link href="/organizations/apply"><Button variant="primary" size="lg">BECOME A PARTNER</Button></Link>
        </div>
        <div className="bg-white border border-border rounded-[18px] p-6 md:p-8">
          <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-4">Trusted by organizations worldwide</p>
          <div className="grid grid-cols-2 gap-4">
            {['ICRC', 'UNHCR', 'Save the Children', 'IFRC'].map((o) => (
              <div key={o} className="h-14 bg-gray-50 rounded-[10px] flex items-center justify-center text-sm font-semibold text-text-muted border border-border-light">{o}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          { icon: FileText, title: 'Case Management', desc: 'Create, track, and manage missing-person cases with full audit trails and role-based access.' },
          { icon: Shield, title: 'Secure Collaboration', desc: 'Share information safely with verified partner organizations across borders and systems.' },
          { icon: Share2, title: 'Match Review', desc: 'Review potential matches identified by our system and collaborate on verification workflows.' },
          { icon: Users, title: 'Role-Based Access', desc: 'Team members get appropriate access levels. Sensitive data is protected by default.' },
          { icon: Globe, title: 'API Integration', desc: 'Coming later. Connect your existing systems to ReturnToKin for automated case sharing.' },
          { icon: FileText, title: 'Audit Trails', desc: 'Every sensitive action is logged. Full transparency for compliance and accountability.' },
        ].map((f) => (
          <Card key={f.title} className="p-5">
            <div className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center mb-3"><f.icon size={16} className="text-teal" /></div>
            <h3 className="text-sm font-bold text-navy mb-1">{f.title}</h3>
            <p className="text-xs text-text-secondary leading-relaxed">{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}