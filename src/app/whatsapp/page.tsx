'use client';
import { useState } from 'react';
import { MessageCircle, Send, Smartphone, Bell, CheckCircle, Globe } from 'lucide-react';
import { Button, Badge, Card, SectionHeading } from '@/components/ui';

export default function WhatsAppPage() {
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <SectionHeading tag="Mobile" title="WhatsApp Integration" />
        <p className="text-text-secondary text-sm -mt-6 mb-8">Get real-time updates about your cases and sightings directly on WhatsApp.</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Bell, title: 'Case Updates', desc: 'Receive notifications when your case status changes' },
            { icon: MessageCircle, title: 'Report via Chat', desc: 'Submit sightings and information through WhatsApp' },
            { icon: Smartphone, title: 'No App Needed', desc: 'Works on any phone with WhatsApp installed' },
            { icon: Globe, title: 'Multi-language', desc: 'Arabic and English support' },
          ].map((f) => (
            <Card key={f.title} className="p-4">
              <div className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center mb-2"><f.icon size={16} className="text-teal" /></div>
              <h3 className="text-sm font-bold text-navy mb-1">{f.title}</h3>
              <p className="text-xs text-text-secondary">{f.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="text-sm font-bold text-navy mb-2">Subscribe to WhatsApp Updates</h3>
          <p className="text-xs text-text-muted mb-4">Enter your WhatsApp number to receive case updates and alerts.</p>
          <div className="flex gap-2">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="flex-1 px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30"
            />
            <Button variant="primary" onClick={() => setSubscribed(true)}>
              <Send size={16} /> Subscribe
            </Button>
          </div>
          {subscribed && (
            <div className="flex items-center gap-2 mt-3 text-sm text-emerald-600 animate-fade-in">
              <CheckCircle size={16} /> Subscribed successfully! You&apos;ll receive updates on WhatsApp.
            </div>
          )}
          <p className="text-xs text-text-muted mt-3">⚠️ Requires WhatsApp Business API setup — contact your administrator to enable this feature.</p>
        </Card>
      </div>
    </div>
  );
}