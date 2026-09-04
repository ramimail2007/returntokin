import Link from 'next/link';
import { Button } from '@/components/ui';

export default function OrganizationApplyPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-teal text-sm font-semibold uppercase tracking-wider">Apply</span>
          <h1 className="text-[28px] font-bold text-navy mt-1">Become a ReturnToKin Partner</h1>
          <p className="text-sm text-text-secondary mt-2">Join a global network of trusted organizations working to reconnect missing people with their families.</p>
        </div>

        <div className="bg-white border border-border rounded-[14px] p-6 md:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-navy mb-1">Organization name *</label><input className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1">Organization type</label>
              <select className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30">
                <option>Humanitarian Organization</option>
                <option>Non-Governmental Organization</option>
                <option>Hospital / Medical</option>
                <option>Shelter / Rescue</option>
                <option>Government / Authority</option>
                <option>Educational Institution</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-navy mb-1">Country</label><input className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1">Registration number</label><input className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-navy mb-1">Website</label><input className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" placeholder="https://" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1">Official email *</label><input type="email" className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
          </div>
          <hr className="border-border" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-navy mb-1">Contact person name</label><input className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
            <div><label className="block text-sm font-medium text-navy mb-1">Role / Title</label><input className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
          </div>
          <div><label className="block text-sm font-medium text-navy mb-1">Why does your organization want to join ReturnToKin?</label><textarea rows={4} className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30 resize-none" /></div>
          <div><label className="block text-sm font-medium text-navy mb-1">Estimated annual case volume</label><input type="number" className="w-full px-4 py-3 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
          <Button variant="primary" size="lg" className="w-full">Submit Application</Button>
        </div>
      </div>
    </div>
  );
}