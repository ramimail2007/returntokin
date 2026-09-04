import { SectionHeading } from '@/components/ui';

export default function CookiesPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeading tag="Trust" title="Cookie Policy" align="center" />
        <div className="text-sm text-text-secondary leading-relaxed space-y-6 mt-8">
          <section><h2 className="text-lg font-bold text-navy mb-2">What Are Cookies</h2><p>Cookies are small text files stored on your device when you visit a website. We use cookies to improve your experience, analyze site traffic, and support our security measures.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">How We Use Cookies</h2><p>We use essential cookies required for the platform to function (authentication, session management). We also use analytics cookies to understand how visitors use our site. We do not use advertising cookies or third-party tracking cookies.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Your Choices</h2><p>You can control cookies through your browser settings. Disabling essential cookies may affect platform functionality. Most browsers allow you to block or delete cookies.</p></section>
          <section><h2 className="text-lg font-bold text-navy mb-2">Updates</h2><p>We may update this policy. Changes will be posted on this page.</p></section>
          <p className="text-xs text-text-muted pt-4">Last updated: September 2026.</p>
        </div>
      </div>
    </div>
  );
}