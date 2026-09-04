import Link from 'next/link';
import { Search, UserCheck, ArrowRight } from 'lucide-react';
import { Button, SectionHeading } from '@/components/ui';

export default function FindMePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-teal-light flex items-center justify-center mx-auto mb-6">
          <UserCheck size={28} className="text-teal" />
        </div>
        <SectionHeading tag="Private" title="Think someone may be looking for you?" align="center" />
        <p className="text-text-secondary text-sm leading-relaxed -mt-4 mb-8 max-w-lg mx-auto">
          You can safely check whether a family member or trusted organization has created a case that may relate to you. 
          Your search is private and secure.
        </p>

        <div className="bg-white border border-border rounded-[14px] p-6 md:p-8 text-left max-w-lg mx-auto mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <span className="w-7 h-7 rounded-full bg-teal-light flex items-center justify-center text-xs font-bold text-teal">1</span>
              Tell us who you are
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <span className="w-7 h-7 rounded-full bg-teal-light flex items-center justify-center text-xs font-bold text-teal">2</span>
              Upload your own photo
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <span className="w-7 h-7 rounded-full bg-teal-light flex items-center justify-center text-xs font-bold text-teal">3</span>
              Review potential matches privately
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <span className="w-7 h-7 rounded-full bg-teal-light flex items-center justify-center text-xs font-bold text-teal">4</span>
              Request safe contact
            </div>
          </div>
        </div>

        <Button variant="primary" size="lg">START PRIVATE SEARCH</Button>
      </div>
    </div>
  );
}