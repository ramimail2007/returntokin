import Link from 'next/link';
import { Shield, MapPin, Lock, Users, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { SectionHeading, Card } from '@/components/ui';

export default function SafetyPage() {
  const sections = [
    {
      icon: MapPin, title: 'Location Protection',
      desc: 'Precise sighting locations are never shown publicly. We use city-level or region-level information only. Verified investigators may receive more precise locations if authorized.',
    },
    {
      icon: Lock, title: 'Access Control',
      desc: 'Sensitive case information is only available to verified users. Every access is logged and audited. We use a tiered trust system (0–5) to determine what each user can see.',
    },
    {
      icon: Users, title: 'Human Verification',
      desc: 'Every potential match requires human review. Automated systems never make final decisions. AI is used only to identify possible candidates, never to confirm identity.',
    },
    {
      icon: Eye, title: 'Child Protection',
      desc: 'Child cases have elevated protection rules. A user claiming to be a parent does not automatically gain access to location or contact information. Law enforcement may be involved in verification.',
    },
    {
      icon: AlertTriangle, title: 'Abuse Prevention',
      desc: 'Every public case has a "Report Abuse" function. High-risk cases can be suspended from public search while remaining active internally. We monitor for misuse patterns.',
    },
    {
      icon: CheckCircle, title: 'Data Privacy',
      desc: 'We collect only what is necessary for the search. Public pages display the minimum useful information. We never share data with third parties without consent or legal requirement.',
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-3xl">
        <SectionHeading tag="Safety" title="Helping people without putting them at risk." />
        <p className="text-text-secondary text-sm leading-relaxed -mt-6 mb-10">
          ReturnToKin is built on the principle that reconnection must never come at the cost of safety. 
          Every feature, every default, and every workflow is designed to protect vulnerable individuals first.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {sections.map((s) => (
          <Card key={s.title} className="p-6">
            <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center mb-3">
              <s.icon size={18} className="text-teal" />
            </div>
            <h3 className="text-[15px] font-bold text-navy mb-2">{s.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}