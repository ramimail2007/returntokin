import { SectionHeading } from '@/components/ui';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeading tag="Trust" title="Terms of Use" align="center" />
        <div className="text-sm text-text-secondary leading-relaxed space-y-6 mt-8">
          <section><h2 className="text-lg font-bold text-navy mb-2">Acceptance of Terms</h2><p>By using ReturnToKin, you agree to these terms. If you do not agree, do not use the platform. ReturnToKin is a non-profit initiative (status: in progress) dedicated to helping reconnect missing people with their families.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">User Responsibilities</h2><p>You agree to provide accurate information. You agree not to use the platform for harassment, stalking, fraud, or any illegal purpose. You agree not to submit false reports or misuse the platform&apos;s reporting tools.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Safety and Privacy</h2><p>ReturnToKin never automatically discloses a located person&apos;s current location. Sensitive case information is protected. We reserve the right to restrict access to cases that may pose a safety risk.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Limitation of Liability</h2><p>ReturnToKin provides a platform for information sharing and matching. We do not guarantee that every case will be resolved. We are not responsible for actions taken by third parties based on information shared through the platform.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Contact</h2><p>For questions about these terms, contact us at <a href="mailto:hello@returntokin.org" className="text-teal hover:underline">hello@returntokin.org</a>.</p></section>
          <p className="text-xs text-text-muted pt-4">Last updated: September 2026.</p>
        </div>
      </div>
    </div>
  );
}