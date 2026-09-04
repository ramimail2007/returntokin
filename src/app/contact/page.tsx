import { SectionHeading } from '@/components/ui';
import { Mail, MessageCircle, Shield } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <SectionHeading tag="Contact" title="Get in touch." align="center" />
        <p className="text-text-secondary text-sm text-center -mt-6 mb-8">We aim to respond within 48 hours.</p>

        <div className="bg-amber-50 border border-amber-200 rounded-[14px] p-4 mb-8 text-sm text-amber-800">
          <strong>⚠️ Emergency notice:</strong> ReturnToKin is not an emergency service. If someone is in immediate danger, contact local emergency services.
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: MessageCircle, label: 'General Inquiries', email: 'hello@returntokin.org' },
            { icon: Mail, label: 'Partnerships', email: 'partners@returntokin.org' },
            { icon: Shield, label: 'Safety & Privacy', email: 'safety@returntokin.org' },
          ].map((c) => (
            <div key={c.label} className="bg-white border border-border rounded-[14px] p-5 text-center">
              <div className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center mx-auto mb-2"><c.icon size={16} className="text-teal" /></div>
              <div className="text-xs text-text-muted mb-1">{c.label}</div>
              <a href={`mailto:${c.email}`} className="text-sm font-semibold text-teal hover:underline">{c.email}</a>
            </div>
          ))}
        </div>

        <div className="bg-white border border-border rounded-[14px] p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Reason</label>
              <select className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30">
                <option>Family support</option>
                <option>Technical issue</option>
                <option>Organization partnership</option>
                <option>Safety concern</option>
                <option>Media</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30 resize-none" placeholder="How can we help?" />
            </div>
            <button className="px-6 py-3 bg-navy text-white text-sm font-semibold rounded-[10px] hover:bg-navy-light transition-colors">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}