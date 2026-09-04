'use client';

import { Search, Shield, Users, Globe, ArrowRight, ChevronRight, Calendar, MapPin, Eye, Lock, UserCheck, Share2, Bell } from 'lucide-react';
import Link from 'next/link';
import { Button, Badge, Card, SectionHeading } from '@/components/ui';
import { demoCases } from '@/lib/constants';

// ── Hero Section ────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 pt-12 md:pt-20 pb-12">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left */}
        <div className="lg:col-span-7 space-y-6 animate-fade-in">
          <h1 className="text-[40px] md:text-[48px] font-bold text-navy leading-[1.15] tracking-tight">
            Someone is missing.
            <br />
            <span className="text-teal">Someone, somewhere, may know something.</span>
          </h1>
          <p className="text-[17px] text-text-secondary leading-relaxed max-w-[560px]">
            ReturnToKin connects families, communities and trusted organizations to help turn scattered information into meaningful leads.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href="/report/missing">
              <Button variant="primary" size="lg">REPORT SOMEONE MISSING</Button>
            </Link>
            <Link href="/report/sighting">
              <Button variant="secondary" size="lg">REPORT A SIGHTING</Button>
            </Link>
          </div>

          {/* Search */}
          <div className="pt-4">
            <div className="flex items-center bg-white border border-border rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden max-w-[560px]">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search size={18} className="text-text-muted shrink-0" />
                <input
                  type="text"
                  placeholder="Search by name, location or case ID"
                  className="flex-1 py-4 text-sm bg-transparent outline-none placeholder:text-text-muted"
                />
              </div>
              <button className="bg-navy text-white px-6 py-4 text-sm font-semibold hover:bg-navy-light transition-colors">
                SEARCH
              </button>
            </div>
            <Link href="/find-me" className="inline-flex items-center gap-1.5 text-sm text-teal font-medium mt-3 hover:underline">
              <UserCheck size={16} />
              I think someone may be looking for me
            </Link>
          </div>
        </div>

        {/* Right: Hero Visual */}
        <div className="lg:col-span-5 animate-slide-up">
          <div className="relative bg-teal-light/50 rounded-[18px] p-5 md:p-6 border border-teal/10">
            {/* Matching flow cards */}
            <div className="space-y-4">
              {/* Card 1: Missing Person */}
              <div className="bg-white rounded-[12px] p-4 border border-border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-800 font-bold text-sm shrink-0">
                    SM
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text-primary">Sofia Martin</span>
                      <Badge variant="missing">MISSING</Badge>
                    </div>
                    <span className="text-xs text-text-muted">Age 22 · Spain</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-3 pl-2">
                <div className="w-px h-6 bg-teal/30 border-l-2 border-dashed border-teal/40" />
                <span className="text-[11px] text-text-muted font-medium">Information shared securely</span>
              </div>

              {/* Card 2: Sighting */}
              <div className="bg-white rounded-[12px] p-4 border border-border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-800 font-bold text-sm shrink-0">
                    ?
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text-primary">Possible Sighting</span>
                      <Badge variant="warning">UNDER REVIEW</Badge>
                    </div>
                    <span className="text-xs text-text-muted">Reported in Nairobi, Kenya · 3 days ago</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-3 pl-2">
                <div className="w-px h-6 bg-teal/30 border-l-2 border-dashed border-teal/40" />
                <span className="text-[11px] text-text-muted font-medium">Reviewed for safety and accuracy</span>
              </div>

              {/* Card 3: Match */}
              <div className="bg-white rounded-[12px] p-4 border border-teal/30 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shrink-0">
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text-primary">Potential Match</span>
                      <Badge variant="success">MATCH UNDER REVIEW</Badge>
                    </div>
                    <span className="text-xs text-text-muted">Reviewing carefully for safety and accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Trust Strip ─────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { icon: Shield, label: 'Privacy-first', desc: 'Your safety and privacy come first.' },
    { icon: UserCheck, label: 'Verified workflows', desc: 'Carefully reviewed at every step.' },
    { icon: Globe, label: 'Cross-border', desc: 'Connecting cases across countries.' },
    { icon: Users, label: 'Human review', desc: 'People at the heart of every decision.' },
  ];
  return (
    <section className="border-y border-border bg-white/50">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center shrink-0 mt-0.5">
                <item.icon size={16} className="text-teal" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">{item.label}</div>
                <div className="text-xs text-text-muted mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '1', label: 'Report', desc: 'A family or organization submits a missing-person report.', color: 'bg-navy text-white' },
    { num: '2', label: 'Search', desc: 'The case is securely stored and can be discovered.', color: 'bg-teal-dark text-white' },
    { num: '3', label: 'Sighting', desc: 'Someone shares information that may help.', color: 'bg-teal text-white' },
    { num: '4', label: 'Verify', desc: 'Our team reviews it for safety and accuracy.', color: 'bg-teal text-white' },
    { num: '5', label: 'Reconnect', desc: 'If it\'s a potential match, we help make the connection.', color: 'bg-navy text-white' },
  ];
  return (
    <section id="how-it-works" className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-16 md:py-20">
      <SectionHeading tag="Process" title="From a missing report to a meaningful lead." align="center" />
      <div className="grid md:grid-cols-5 gap-6 md:gap-4 mt-8">
        {steps.map((step, i) => (
          <div key={step.label} className="relative text-center">
            {/* Connector line (desktop) */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px border-t-2 border-dashed border-teal/30 z-0" />
            )}
            {/* Step circle */}
            <div className={`relative z-10 w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-sm font-bold mx-auto mb-4`}>
              {step.num}
            </div>
            <h3 className="text-sm font-bold text-navy mb-2">{step.label}</h3>
            <p className="text-xs text-text-secondary leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Primary Actions ─────────────────────────────────────────────────
function PrimaryActions() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 pb-10">
      <div className="grid md:grid-cols-2 gap-5">
        <Link href="/report/missing" className="group block bg-white border border-border rounded-[14px] p-6 md:p-8 hover:border-teal/30 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center mb-4">
            <UserCheck size={22} className="text-teal" />
          </div>
          <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-teal transition-colors">I am looking for someone</h3>
          <p className="text-sm text-text-secondary mb-4 leading-relaxed">Create a missing-person case and share verified information safely.</p>
          <span className="text-sm font-semibold text-teal flex items-center gap-1.5">
            REPORT SOMEONE MISSING <ArrowRight size={14} />
          </span>
        </Link>
        <Link href="/report/sighting" className="group block bg-white border border-border rounded-[14px] p-6 md:p-8 hover:border-teal/30 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center mb-4">
            <Eye size={22} className="text-teal" />
          </div>
          <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-teal transition-colors">I may have seen someone</h3>
          <p className="text-sm text-text-secondary mb-4 leading-relaxed">Send a sighting or piece of information that may help an active case.</p>
          <span className="text-sm font-semibold text-teal flex items-center gap-1.5">
            REPORT A SIGHTING <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </section>
  );
}

// ── Case Cards Grid ─────────────────────────────────────────────────
function CaseCard({ c }: { c: typeof demoCases[0] }) {
  const initials = c.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const colors = ['from-amber-100 to-amber-200', 'from-blue-100 to-blue-200', 'from-emerald-100 to-emerald-200', 'from-purple-100 to-purple-200', 'from-rose-100 to-rose-200', 'from-cyan-100 to-cyan-200'];
  const gradient = colors[Math.abs(c.name.charCodeAt(0)) % colors.length];
  return (
    <div className="bg-white border border-border rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
      {/* Photo placeholder */}
      <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-2xl font-bold text-navy/30">{initials}</span>
      </div>
      {/* Info */}
      <div className="p-4">
        <Badge variant="missing">{c.status}</Badge>
        <h3 className="text-[15px] font-bold text-text-primary mt-2">{c.name}</h3>
        <div className="text-xs text-text-secondary space-y-1 mt-2">
          <div className="flex items-center gap-1.5"><span>Age {c.age}</span></div>
          <div className="flex items-center gap-1.5"><MapPin size={12} /><span>{c.lastSeen}</span></div>
          <div className="flex items-center gap-1.5"><Calendar size={12} /><span>{c.date}</span></div>
        </div>
        <Link href={`/case/${c.id}`} className="flex items-center justify-between w-full mt-3 pt-3 border-t border-border text-sm font-semibold text-navy hover:text-teal transition-colors">
          VIEW CASE <ChevronRight size={14} />
        </Link>
        <Link href={`/report/sighting?case=${c.id}`} className="block text-[11px] text-text-muted mt-2 hover:text-teal transition-colors">
          I may have seen this person →
        </Link>
      </div>
    </div>
  );
}

function CasesSection() {
  return (
    <section className="bg-white/50 border-y border-border py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="flex items-end justify-between mb-8">
          <SectionHeading title="Recently published public cases" />
          <Link href="/search" className="hidden md:flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
            View all cases <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {demoCases.slice(0, 4).map((c) => <CaseCard key={c.id} c={c} />)}
        </div>
        <div className="flex md:hidden mt-6">
          <Link href="/search" className="flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
            View all cases <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Safety Section ──────────────────────────────────────────────────
function SafetySection() {
  const items = [
    { icon: MapPin, title: 'Protected locations', desc: 'Precise sighting locations are never shown publicly.' },
    { icon: Lock, title: 'Verified access', desc: 'Sensitive case information is only available to verified users.' },
    { icon: Users, title: 'Human review', desc: 'Every match is reviewed by people before any action is taken.' },
  ];
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-16 md:py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-teal text-sm font-semibold uppercase tracking-wider">Safety First</span>
          <h2 className="text-[28px] md:text-[32px] font-bold text-navy leading-tight mt-2 mb-4">Safety before speed.</h2>
          <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
            ReturnToKin never automatically publishes a person&apos;s current location or shares sensitive case information with unverified users.
          </p>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-teal" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{item.title}</div>
                  <div className="text-xs text-text-secondary">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/safety" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal mt-6 hover:underline">
            Learn about our safety model <ArrowRight size={14} />
          </Link>
        </div>
        {/* Right: Visual */}
        <div className="bg-teal-light/30 rounded-[18px] p-8 md:p-10 border border-teal/10">
          <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-4">
            <Shield size={32} className="text-teal" />
          </div>
          <h3 className="text-xl font-bold text-navy mb-3">Safety architecture</h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            {['Location data is never exposed publicly', 'All users are verified before accessing sensitive information', 'Every potential match requires human review', 'High-risk cases have restricted visibility', 'All actions are audited'].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── For Organizations ───────────────────────────────────────────────
function OrganizationsSection() {
  return (
    <section className="bg-white/50 border-y border-border py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-teal text-sm font-semibold uppercase tracking-wider">For Organizations</span>
            <h2 className="text-[28px] md:text-[32px] font-bold text-navy leading-tight mt-2 mb-4">One case may exist across many disconnected systems.</h2>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
              ReturnToKin helps trusted organizations coordinate cases, sightings and potential matches across borders and systems.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/organizations/apply">
                <Button variant="primary">BECOME A PARTNER</Button>
              </Link>
              <Link href="/organizations">
                <Button variant="secondary">Explore Partners</Button>
              </Link>
            </div>
          </div>
          {/* Partner logos placeholder */}
          <div className="bg-white border border-border rounded-[14px] p-6 md:p-8">
            <p className="text-xs text-text-muted mb-4 font-semibold uppercase tracking-wider">Trusted by organizations worldwide</p>
            <div className="grid grid-cols-2 gap-4">
              {['ICRC', 'UNHCR', 'Save the Children', 'IFRC'].map((org) => (
                <div key={org} className="h-14 bg-gray-50 rounded-[10px] flex items-center justify-center text-sm font-semibold text-text-muted border border-border-light">
                  {org}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Impact Stats ────────────────────────────────────────────────────
function ImpactSection() {
  const stats = [
    { label: 'Cases supported', value: '—' },
    { label: 'Countries represented', value: '—' },
    { label: 'Verified partners', value: '—' },
    { label: 'Reconnections', value: '—' },
  ];
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-16 md:py-20 text-center">
      <SectionHeading tag="Impact" title="Coming soon." align="center" />
      <p className="text-text-secondary text-sm max-w-lg mx-auto mb-10">Real impact metrics will appear here as cases are verified and families are reconnected.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-[14px] p-5">
            <div className="text-[28px] font-bold text-navy">{s.value}</div>
            <div className="text-xs text-text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Closing CTA ─────────────────────────────────────────────────────
function ClosingCTA() {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-20 md:py-24 text-center">
        <h2 className="text-[32px] md:text-[40px] font-bold leading-tight mb-4">One clue can change everything.</h2>
        <p className="text-white/60 text-[15px] max-w-lg mx-auto mb-8">Help connect information that may lead someone home.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/report/missing">
            <Button variant="white" size="lg">REPORT SOMEONE MISSING</Button>
          </Link>
          <Link href="/report/sighting">
            <Button variant="secondary" size="lg" className="!border-white !text-white hover:!bg-white/10">REPORT A SIGHTING</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Newsletter (Sidebar component) ──────────────────────────────────
function NewsletterCard() {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-navy mb-1">Stay informed, help bring people home.</h3>
      <p className="text-xs text-text-muted mb-4">Get updates on how ReturnToKin is building safer ways to reconnect families.</p>
      <div className="flex gap-2">
        <input type="email" placeholder="Enter your email" className="flex-1 px-3 py-2.5 text-sm bg-bg border border-border rounded-[10px] outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal placeholder:text-text-muted" />
        <button className="px-4 py-2.5 bg-navy text-white text-xs font-semibold rounded-[10px] hover:bg-navy-light transition-colors shrink-0">SUBSCRIBE</button>
      </div>
      <p className="text-[10px] text-text-muted mt-2">We respect your privacy.</p>
    </Card>
  );
}

// ── Main Home Page ──────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <PrimaryActions />
      <CasesSection />
      <SafetySection />
      <OrganizationsSection />
      <ImpactSection />
      <ClosingCTA />
    </>
  );
}