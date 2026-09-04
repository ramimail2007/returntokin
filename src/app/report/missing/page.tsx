import Link from 'next/link';
import { ArrowRight, User, Camera, MapPin, FileText, Shield } from 'lucide-react';
import { Button, SectionHeading, Card } from '@/components/ui';

export default function ReportMissingPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <SectionHeading tag="Report" title="Report someone missing" />
        <p className="text-text-secondary text-sm -mt-6 mb-6">We will guide you step by step. Your report will be reviewed before becoming public.</p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1,2,3,4,5,6,7].map((step) => (
            <div key={step} className="flex-1 h-1.5 rounded-full bg-gray-200"><div className={`h-full rounded-full ${step === 1 ? 'bg-teal w-full' : step < 1 ? 'bg-teal w-full' : 'w-0'}`} /></div>
          ))}
          <span className="text-xs text-text-muted ml-2">1 of 7</span>
        </div>

        {/* What you need box */}
        <Card className="p-5 mb-6 border-l-4 border-l-teal">
          <h3 className="text-sm font-bold text-navy mb-2">What you may need:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
            <div className="flex items-center gap-2"><User size={14} className="text-teal" /> Basic identity information</div>
            <div className="flex items-center gap-2"><Camera size={14} className="text-teal" /> Recent photo</div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-teal" /> Last known location</div>
            <div className="flex items-center gap-2"><FileText size={14} className="text-teal" /> Your relationship to the person</div>
          </div>
        </Card>

        <div className="space-y-3">
          <Link href="/report/missing/relationship" className="block">
            <Button variant="primary" size="lg" className="w-full">START REPORT</Button>
          </Link>
          <button className="w-full text-sm text-text-muted hover:text-teal py-2 transition-colors">Save and continue later</button>
        </div>
      </div>
    </div>
  );
}