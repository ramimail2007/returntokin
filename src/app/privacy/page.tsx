import { SectionHeading } from '@/components/ui';

export default function PrivacyPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeading tag="Trust" title="Privacy Policy" align="center" />
        <div className="text-sm text-text-secondary leading-relaxed space-y-6 mt-8">
          <section><h2 className="text-lg font-bold text-navy mb-2">Collect Less</h2><p>We collect only the information necessary to help reconnect missing people with their families. We never request or store unnecessary personal data. You control what information is shared and with whom.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Reveal Less</h2><p>Public case pages display the minimum useful information — first name, last initial, approximate age, and city-level location. Precise addresses, contact details, and identity documents are never shown publicly.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Control More</h2><p>Sensitive information is accessible only to appropriately verified users. Every access to protected data is logged and audited. You can request removal of your personal information at any time.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Data Protection</h2><p>All data is encrypted in transit and at rest. We use role-based access controls, secure authentication, and audit logging. We never share personal information with third parties without consent or legal requirement.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Your Rights</h2><p>You may request access to, correction of, or deletion of your personal data at any time by contacting us. We will respond within 30 days.</p></section>
          <p className="text-xs text-text-muted pt-4">Last updated: September 2026. ReturnToKin is a registered non-profit initiative (status: in progress).</p>
        </div>
      </div>
    </div>
  );
}