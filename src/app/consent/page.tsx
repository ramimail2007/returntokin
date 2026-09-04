'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, CheckCircle, XCircle, AlertTriangle, UserCheck } from 'lucide-react';
import { Button, Badge, Card, SectionHeading } from '@/components/ui';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://returntokin-api.onrender.com';

export default function ConsentPage() {
  const [token, setToken] = useState('');
  const [consentData, setConsentData] = useState<any>(null);
  const [step, setStep] = useState<'input' | 'review' | 'done'>('input');
  const [decision, setDecision] = useState<'yes' | 'no' | null>(null);
  const [safetyNote, setSafetyNote] = useState('');

  const handleLookup = () => {
    // In production, verify token via API
    if (token.length < 5) return;
    setConsentData({
      case_id: 'RTK-26-X7F3',
      person: 'Ahmed A.',
      reporter: 'Family member',
      status: 'pending',
    });
    setStep('review');
  };

  const handleSubmit = async () => {
    if (!decision) return;
    // In production: POST /api/consent/respond
    setStep('done');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <SectionHeading tag="Private & Secure" title="Reconnection Request" align="center" />

        {step === 'input' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-teal-light flex items-center justify-center mx-auto mb-6">
              <Shield size={28} className="text-teal" />
            </div>
            <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
              If you&apos;ve received a reconnection request from ReturnToKin, enter your secure token below. This is your private space to review and respond.
            </p>
            <div className="max-w-sm mx-auto space-y-4">
              <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your secure token"
                className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30 text-center font-mono"
              />
              <Button variant="primary" className="w-full" onClick={handleLookup}>Review Request</Button>
              <p className="text-xs text-text-muted">This token was shared with you privately by ReturnToKin or a partner organization.</p>
            </div>
          </div>
        )}

        {step === 'review' && consentData && (
          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-l-teal">
              <h3 className="text-lg font-bold text-navy mb-1">Reconnection Request</h3>
              <p className="text-sm text-text-muted mb-4">Someone has submitted a case that may be connected to you.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-muted">Person of interest:</span><span className="font-semibold">{consentData.person}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Relationship:</span><span>{consentData.reporter}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Case:</span><span className="font-mono text-xs">{consentData.case_id}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Status:</span><Badge variant="warning">Awaiting Your Decision</Badge></div>
              </div>
            </Card>

            <div className="bg-amber-50 border border-amber-200 rounded-[14px] p-5">
              <div className="flex items-start gap-2">
                <Shield size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong className="block mb-1">Your privacy is protected.</strong>
                  No personal information has been shared with anyone. You are in complete control of what happens next.
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-navy mb-3">Your Decision</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setDecision('yes')}
                  className={`p-4 rounded-[14px] border-2 text-left transition-all ${decision === 'yes' ? 'border-emerald-400 bg-emerald-50' : 'border-border hover:border-emerald-200'}`}
                >
                  <CheckCircle size={20} className={`mb-2 ${decision === 'yes' ? 'text-emerald-500' : 'text-text-muted'}`} />
                  <div className="text-sm font-semibold text-navy mb-1">Yes, I&apos;d like to connect</div>
                  <div className="text-xs text-text-secondary">I believe this may be related to me and I&apos;m ready to explore reconnection safely.</div>
                </button>
                <button
                  onClick={() => setDecision('no')}
                  className={`p-4 rounded-[14px] border-2 text-left transition-all ${decision === 'no' ? 'border-red-300 bg-red-50' : 'border-border hover:border-red-200'}`}
                >
                  <XCircle size={20} className={`mb-2 ${decision === 'no' ? 'text-red-400' : 'text-text-muted'}`} />
                  <div className="text-sm font-semibold text-navy mb-1">No, I&apos;m not interested</div>
                  <div className="text-xs text-text-secondary">I don&apos;t wish to pursue this. My case will remain private.</div>
                </button>
              </div>
            </div>

            {decision === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Safety notes (optional)</label>
                <textarea
                  value={safetyNote}
                  onChange={(e) => setSafetyNote(e.target.value)}
                  rows={3}
                  placeholder="Any concerns or context you'd like to share..."
                  className="w-full px-4 py-3 bg-white border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30 resize-none"
                />
              </div>
            )}

            <Button variant="primary" size="lg" className="w-full" onClick={handleSubmit} disabled={!decision}>
              {decision === 'yes' ? 'Submit Consent — Begin Safe Reconnection' : decision === 'no' ? 'Submit Decision — Keep Case Private' : 'Select an option above'}
            </Button>
          </div>
        )}

        {step === 'done' && (
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${decision === 'yes' ? 'bg-emerald-50' : 'bg-gray-50'}`}>
              {decision === 'yes' ? <CheckCircle size={28} className="text-emerald-500" /> : <Shield size={28} className="text-gray-400" />}
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">
              {decision === 'yes' ? 'Thank you. Your consent has been recorded.' : 'Your decision has been recorded.'}
            </h3>
            <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
              {decision === 'yes'
                ? 'A ReturnToKin team member will review your response and initiate the safe reconnection process. You may be contacted through your preferred channel.'
                : 'The case will remain private. No further action will be taken unless you change your mind.'}
            </p>
            <Link href="/"><Button variant="secondary">Return to ReturnToKin</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
}