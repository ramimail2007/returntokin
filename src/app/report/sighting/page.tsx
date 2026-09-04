import Link from 'next/link';
import { Eye, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { Button, SectionHeading } from '@/components/ui';

export default function ReportSightingPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <SectionHeading tag="Report" title="Report a sighting" />
        <p className="text-text-secondary text-sm -mt-6 mb-8">Help connect information that may lead someone home.</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Where did you see them?</label>
            <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" placeholder="City, country, or specific location" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Date</label>
              <input type="date" className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Time (optional)</label>
              <input type="time" className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">What did you notice?</label>
            <textarea rows={3} className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30 resize-none" placeholder="Clothing, behavior, direction of travel, anything unusual..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Photo (optional)</label>
            <div className="border-2 border-dashed border-border rounded-[14px] p-8 text-center hover:border-teal/30 transition-colors cursor-pointer">
              <CameraIcon />
              <p className="text-sm text-text-muted mt-2">Click to upload or drag and drop</p>
              <p className="text-xs text-text-muted mt-1">JPG, PNG up to 10MB</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-[14px] p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <strong>Is the person currently in immediate danger?</strong><br />
                <div className="flex gap-3 mt-2">
                  {['Yes', 'No', 'Not sure'].map((o) => (
                    <label key={o} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="danger" className="accent-teal" /> {o}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Can we contact you? (optional)</label>
            <input type="email" className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" placeholder="Email address" />
            <p className="text-xs text-text-muted mt-1">Your contact information will not be shared publicly. Anonymous submissions are also accepted.</p>
          </div>
          <Button variant="primary" size="lg" className="w-full">SUBMIT SIGHTING</Button>
        </div>
      </div>
    </div>
  );
}

function CameraIcon() {
  return <svg className="mx-auto text-text-muted" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>;
}