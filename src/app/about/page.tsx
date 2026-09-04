import Link from 'next/link';
import { SectionHeading } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeading tag="About" title="Every missing person deserves a way back." align="center" />
        <p className="text-text-secondary text-[15px] leading-relaxed text-center -mt-6 mb-12">
          ReturnToKin exists to create a trusted global network that connects missing-person reports, sightings, 
          unidentified individuals, families, humanitarian organizations, and relevant institutions.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">The Problem</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              When someone goes missing, their information is scattered across disconnected systems — 
              family reports, social media posts, hospital records, shelter databases, and government files. 
              These systems rarely communicate with one another. A sighting in one country may never reach 
              the family searching in another. Critical connections are lost between systems, between borders, 
              and between the people who hold the missing pieces.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Our Approach</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              ReturnToKin is a reconnection network, not a missing persons directory. We transform fragmented 
              information into actionable, verified leads. Our platform connects families, communities, 
              humanitarian organizations, and institutions — creating a single trusted layer where information 
              can be shared safely and matched intelligently.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Our Principles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Safety First', desc: 'We never disclose a located person\'s current location automatically. Safety always precedes speed.' },
                { title: 'Privacy by Design', desc: 'We collect less, reveal less, and control more. Public pages display the minimum useful information.' },
                { title: 'Human Verification', desc: 'Every potential match is reviewed by trained professionals before any action is taken.' },
                { title: 'Global by Default', desc: 'Cases cross borders. Our architecture and partnerships are designed for international interoperability.' },
              ].map((p) => (
                <div key={p.title} className="bg-white border border-border rounded-[14px] p-5">
                  <h3 className="text-sm font-bold text-navy mb-1">{p.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center pt-6">
            <p className="text-sm text-text-secondary mb-4">ReturnToKin is a registered non-profit initiative (status: in progress).</p>
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline">
              Contact us <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}